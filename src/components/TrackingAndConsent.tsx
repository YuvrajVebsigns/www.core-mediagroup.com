// 'use client';

// import { usePathname } from 'next/navigation';
// import { useEffect, useRef, useState } from 'react';
// import { ensureWebsiteAuth } from '@/lib/website-auth';
// import { CoreMediaTracker } from '@/lib/tracker';

// export default function TrackingAndConsent() {
//   const pathname = usePathname();
//   const [tracker, setTracker] = useState<CoreMediaTracker | null>(null);
//   const [showBanner, setShowBanner] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   const prevPathnameRef = useRef<string | null>(null);

//   // Initialize tracker and check consent status on mount
//   useEffect(() => {
//     setIsMounted(true);

//     async function initTracker() {
//       try {
//         const auth = await ensureWebsiteAuth();
//         if (!auth || !auth.token) return;

//         const clientTracker = new CoreMediaTracker({
//           backendUrl: '/api/v1',
//           token: auth.token,
//         });

//         setTracker(clientTracker);

//         // Check if consent status is set
//         const consent = clientTracker.getConsentStatus();
//         if (!consent) {
//           setShowBanner(true);
//           // Small delay to trigger the slide-up CSS transition
//           setTimeout(() => setIsAnimating(true), 50);
//         } else if (consent === 'accepted') {
//           // Track initial pageview
//           clientTracker.trackPageview();
//         }
//       } catch {
//         // Fail silently without breaking the UI
//       }
//     }

//     initTracker();
//   }, []);

//   // Track pageviews on route transitions
//   useEffect(() => {
//     if (!tracker) return;

//     const consent = tracker.getConsentStatus();
//     if (consent !== 'accepted') return;

//     // Track on route transitions
//     const currentPath = window.location.pathname + window.location.search;
//     if (prevPathnameRef.current !== currentPath) {
//       // Don't double track the initial page view
//       if (prevPathnameRef.current !== null) {
//         tracker.trackPageview();
//       }
//       prevPathnameRef.current = currentPath;
//     }
//   }, [pathname, tracker]);

//   // Track interactions globally
//   useEffect(() => {
//     if (!tracker) return;

//     const handleGlobalClick = (event: MouseEvent) => {
//       const consent = tracker.getConsentStatus();
//       if (consent !== 'accepted') return;

//       const target = event.target as HTMLElement;

//       // Match buttons, links, inputs of type submit, and interactive roles
//       const targetElement = target.closest(
//         'button, a, input[type="submit"], [role="button"]',
//       ) as HTMLElement | null;

//       if (!targetElement) return;

//       const elementId = targetElement.id || '';
//       const elementText = targetElement.textContent?.trim() || '';
//       const classNames = targetElement.className || '';

//       // Context classification
//       const isContactForm =
//         !!targetElement.closest('form') ||
//         !!targetElement.closest('#contact') ||
//         classNames.includes('contact');

//       const isNewsletter =
//         !!targetElement.closest('#newsletter') ||
//         classNames.includes('newsletter') ||
//         elementText.toLowerCase().includes('subscribe') ||
//         elementText.toLowerCase().includes('newsletter');

//       const isSponsor =
//         !!targetElement.closest('#sponsors') ||
//         !!targetElement.closest('.sponsor') ||
//         classNames.includes('sponsor');

//       // Track if it's one of the target interactions or has a custom ID
//       if (isContactForm || isNewsletter || isSponsor || elementId) {
//         tracker.trackInteraction(elementId || 'anonymous-element', elementText, {
//           classNames,
//           category: isContactForm
//             ? 'contact_form'
//             : isNewsletter
//               ? 'newsletter'
//               : isSponsor
//                 ? 'sponsor'
//                 : 'other',
//           tagName: targetElement.tagName.toLowerCase(),
//         });
//       }
//     };

//     document.addEventListener('click', handleGlobalClick);
//     return () => {
//       document.removeEventListener('click', handleGlobalClick);
//     };
//   }, [tracker]);

//   const handleAccept = () => {
//     if (!tracker) return;
//     tracker.setConsent('accepted');
//     setIsAnimating(false);
//     setTimeout(() => setShowBanner(false), 300);
//     tracker.trackPageview();
//   };

//   const handleDecline = () => {
//     if (!tracker) return;
//     tracker.setConsent('declined');
//     setIsAnimating(false);
//     setTimeout(() => setShowBanner(false), 300);
//   };

//   // Prevent server-side render / hydration mismatch issues
//   if (!isMounted || !showBanner) return null;

//   return (
//     <div className={`cookie-consent-banner ${isAnimating ? 'cookie-consent-banner--visible' : ''}`}>
//       <div className="cookie-consent-card">
//         <div className="cookie-consent-header">
//           <div className="cookie-consent-title-group">
//             <p className="cookie-consent-label">Cookie consent</p>
//             <h3 className="cookie-consent-title">
//               Let&apos;s Talk Cookies <span>🍪</span>
//             </h3>
//           </div>
//           {/* <button
//             onClick={handleDecline}
//             className="cookie-consent-close"
//             aria-label="Close cookie consent banner"
//           >
//             <svg
//               className="cookie-consent-close-icon"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button> */}
//         </div>

//         <div className="cookie-consent-body">
//           <p>
//             We use cookies to enhance your browsing experience, personalize content, and understand
//             how the site performs.
//           </p>
//           <p>
//             Click <strong>Accept all</strong> to agree to cookies that help us deliver better
//             content and a smoother browsing experience.
//           </p>
//           <p>
//             View our{' '}
//             <a href="/contact" className="cookie-consent-link">
//               Cookie Policy
//             </a>{' '}
//             to update or disable preferences anytime.
//           </p>
//         </div>

//         <div className="cookie-consent-actions">
//           <button
//             onClick={handleAccept}
//             className="cookie-consent-button cookie-consent-button--primary"
//           >
//             Accept all
//           </button>
//           <button
//             onClick={handleDecline}
//             className="cookie-consent-button cookie-consent-button--secondary"
//           >
//             Essential only
//           </button>
//           <button
//             onClick={handleDecline}
//             className="cookie-consent-button cookie-consent-button--secondary"
//           >
//             Customize
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';

export default function CookieConsentBanner() {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const consent = window.localStorage.getItem('core_media_cookie_consent');
    if (consent) return;

    setIsRendered(true);
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => window.clearTimeout(timer);
  }, []);

  const dispatchConsentChanged = (status: 'accepted' | 'declined') => {
    if (typeof window === 'undefined') return;

    window.localStorage.setItem('core_media_cookie_consent', status);
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: { status } }));
  };

  const closeBanner = (status: 'accepted' | 'declined') => {
    dispatchConsentChanged(status);
    setIsVisible(false);
    window.setTimeout(() => {
      setIsRendered(false);
    }, 350);
  };

  const handleAccept = () => {
    closeBanner('accepted');
  };

  const handleDecline = () => {
    closeBanner('declined');
  };

  const handleSavePreferences = () => {
    if (analyticsEnabled) {
      handleAccept();
    } else {
      handleDecline();
    }
  };

  if (!isRendered) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className={`cookie-consent-banner ${isVisible ? 'cookie-consent-banner--visible' : ''}`}
    >
      <div className="cookie-consent-card">
        <div className="cookie-consent-header">
          <div className="cookie-consent-title-group">
            <span className="cookie-consent-label">Cookie Consent</span>

            <h3 id="cookie-title" className="cookie-consent-title">
              Let&apos;s Talk Cookies 🍪
            </h3>
          </div>

          {/* <button
            type="button"
            onClick={onDecline}
            aria-label="Close cookie consent banner"
            className="cookie-consent-close"
          >
            <X className="cookie-consent-close-icon" />
          </button> */}
        </div>

        <div id="cookie-desc" className="cookie-consent-body">
          <p>
            We use cookies to enhance your browsing experience, personalize your content, and
            understand site performance.
          </p>
          <br />

          <p>
            Click <strong> Accept all </strong> to agree to cookies that help us deliver better
            content and a smoother browsing experience.
          </p>

          <p>
            View our{' '}
            <a href="/privacy-policy" className="cookie-consent-link">
              Cookie Policy
            </a>{' '}
            to update or disable preferences anytime.
          </p>
        </div>

        {showPreferences && (
          <div className="cookie-consent-preferences">
            <p className="cookie-consent-preferences-label">Cookie Preferences</p>

            <div className="cookie-consent-preference-list">
              <div className="cookie-consent-preference-item">
                <div>
                  <p className="cookie-consent-preference-title">Essential Cookies</p>
                  <p className="cookie-consent-preference-text">
                    Required for the website to function properly.
                  </p>
                </div>

                <span className="cookie-consent-badge">Always Active</span>
              </div>

              <div className="cookie-consent-preference-item">
                <div>
                  <p className="cookie-consent-preference-title">
                    Analytics &amp; Performance Cookies
                  </p>
                  <p className="cookie-consent-preference-text">
                    Help us understand visitor usage and optimize site performance.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="cookie-consent-checkbox"
                />
              </div>
            </div>
          </div>
        )}

        <div className="cookie-consent-actions">
          {showPreferences ? (
            <>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="cookie-consent-button cookie-consent-button--ghost"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSavePreferences}
                className="cookie-consent-button cookie-consent-button--dark"
              >
                Save Preferences
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAccept}
                id="btn-accept-all-cookies"
                className="cookie-consent-button cookie-consent-button--primary"
              >
                Accept all
              </button>

              <button
                type="button"
                onClick={handleDecline}
                id="btn-essential-only-cookies"
                className="cookie-consent-button cookie-consent-button--secondary"
              >
                Essential only
              </button>

              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                id="btn-customize-cookies"
                className="cookie-consent-button cookie-consent-button--secondary"
              >
                <Settings className="cookie-consent-settings-icon" />
                Customize
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
