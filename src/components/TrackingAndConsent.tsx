'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ensureWebsiteAuth } from '@/lib/website-auth';
import { CoreMediaTracker } from '@/lib/tracker';

export default function TrackingAndConsent() {
  const pathname = usePathname();
  const [tracker, setTracker] = useState<CoreMediaTracker | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const prevPathnameRef = useRef<string | null>(null);

  // Initialize tracker and check consent status on mount
  useEffect(() => {
    setIsMounted(true);

    async function initTracker() {
      try {
        const auth = await ensureWebsiteAuth();
        if (!auth || !auth.token) return;

        const clientTracker = new CoreMediaTracker({
          backendUrl: '/api/v1',
          token: auth.token,
        });

        setTracker(clientTracker);

        // Check if consent status is set
        const consent = clientTracker.getConsentStatus();
        if (!consent) {
          setShowBanner(true);
          // Small delay to trigger the slide-up CSS transition
          setTimeout(() => setIsAnimating(true), 50);
        } else if (consent === 'accepted') {
          // Track initial pageview
          clientTracker.trackPageview();
        }
      } catch {
        // Fail silently without breaking the UI
      }
    }

    initTracker();
  }, []);

  // Track pageviews on route transitions
  useEffect(() => {
    if (!tracker) return;

    const consent = tracker.getConsentStatus();
    if (consent !== 'accepted') return;

    // Track on route transitions
    const currentPath = window.location.pathname + window.location.search;
    if (prevPathnameRef.current !== currentPath) {
      // Don't double track the initial page view
      if (prevPathnameRef.current !== null) {
        tracker.trackPageview();
      }
      prevPathnameRef.current = currentPath;
    }
  }, [pathname, tracker]);

  // Track interactions globally
  useEffect(() => {
    if (!tracker) return;

    const handleGlobalClick = (event: MouseEvent) => {
      const consent = tracker.getConsentStatus();
      if (consent !== 'accepted') return;

      const target = event.target as HTMLElement;

      // Match buttons, links, inputs of type submit, and interactive roles
      const targetElement = target.closest(
        'button, a, input[type="submit"], [role="button"]',
      ) as HTMLElement | null;

      if (!targetElement) return;

      const elementId = targetElement.id || '';
      const elementText = targetElement.textContent?.trim() || '';
      const classNames = targetElement.className || '';

      // Context classification
      const isContactForm =
        !!targetElement.closest('form') ||
        !!targetElement.closest('#contact') ||
        classNames.includes('contact');

      const isNewsletter =
        !!targetElement.closest('#newsletter') ||
        classNames.includes('newsletter') ||
        elementText.toLowerCase().includes('subscribe') ||
        elementText.toLowerCase().includes('newsletter');

      const isSponsor =
        !!targetElement.closest('#sponsors') ||
        !!targetElement.closest('.sponsor') ||
        classNames.includes('sponsor');

      // Track if it's one of the target interactions or has a custom ID
      if (isContactForm || isNewsletter || isSponsor || elementId) {
        tracker.trackInteraction(elementId || 'anonymous-element', elementText, {
          classNames,
          category: isContactForm
            ? 'contact_form'
            : isNewsletter
              ? 'newsletter'
              : isSponsor
                ? 'sponsor'
                : 'other',
          tagName: targetElement.tagName.toLowerCase(),
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [tracker]);

  const handleAccept = () => {
    if (!tracker) return;
    tracker.setConsent('accepted');
    setIsAnimating(false);
    setTimeout(() => setShowBanner(false), 300);
    tracker.trackPageview();
  };

  const handleDecline = () => {
    if (!tracker) return;
    tracker.setConsent('declined');
    setIsAnimating(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  // Prevent server-side render / hydration mismatch issues
  if (!isMounted || !showBanner) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ease-out ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="w-[min(92vw,24rem)] rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_20px_45px_rgba(0,0,0,0.16)] sm:p-5 flex flex-col gap-4">
        {/* Header with Title and Close Button */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center !gap-2">
            Let&apos;s Talk Cookies <span className="text-2xl">🍪</span>
          </h3>
          <button
            onClick={handleDecline}
            className="text-slate-400 hover:text-slate-600 transition-colors !p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
            aria-label="Close cookie consent banner"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Text */}
        <div className="flex flex-col !gap-4">
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
            We use cookies to enhance your browsing experience, personalize your content, and
            understand site performance. By clicking &ldquo;Accept all&rdquo;, you consent to the
            use of cookies that help us deliver tailored content and improve how our site works.
          </p>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
            You can view our full{' '}
            <a
              href="/contact"
              className="font-bold underline text-slate-900 hover:text-[#8e0101] transition-colors"
            >
              Cookie Policy
            </a>{' '}
            for more details and update or disable your preferences anytime.
          </p>
        </div>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row !gap-3 justify-end items-stretch sm:items-center !mt-4 md:!mt-6 w-full sm:w-auto">
          <button
            onClick={handleAccept}
            className="w-full sm:w-auto !px-6 !py-3 bg-[#8e0101] hover:bg-[#a60202] text-white font-bold text-sm rounded-full shadow-lg shadow-red-900/10 hover:shadow-red-900/20 active:scale-[0.98] transition-all cursor-pointer text-center whitespace-nowrap min-w-[120px]"
          >
            Accept all
          </button>
          <button
            onClick={handleDecline}
            className="w-full sm:w-auto !px-6 !py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-full border border-slate-300 active:scale-[0.98] transition-all cursor-pointer text-center whitespace-nowrap min-w-[120px]"
          >
            Essential only
          </button>
          <button
            onClick={handleDecline}
            className="w-full sm:w-auto flex items-center justify-center !gap-1.5 !px-6 !py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-full border border-slate-300 active:scale-[0.98] transition-all cursor-pointer text-center whitespace-nowrap min-w-[120px]"
          >
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Customize
          </button>
        </div>
      </div>
    </div>
  );
}
