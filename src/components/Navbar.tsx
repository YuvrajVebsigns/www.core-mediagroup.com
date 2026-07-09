'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const platformsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isServicesPage =
    pathname === '/survey-study' ||
    pathname === '/video' ||
    pathname === '/bespoke-events' ||
    pathname === '/dialoges';

  const openServices = () => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }

    setServicesOpen(true);
  };

  const closeServices = () => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
    }

    servicesCloseTimer.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimer.current = null;
    }, 140);
  };

  const openPlatforms = () => {
    if (platformsCloseTimer.current) {
      clearTimeout(platformsCloseTimer.current);
      platformsCloseTimer.current = null;
    }

    setPlatformsOpen(true);
  };

  const closePlatforms = () => {
    if (platformsCloseTimer.current) {
      clearTimeout(platformsCloseTimer.current);
    }

    platformsCloseTimer.current = setTimeout(() => {
      setPlatformsOpen(false);
      platformsCloseTimer.current = null;
    }, 140);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setServicesOpen(false);
    setPlatformsOpen(false);
  };

  return (
    <header className={`navbar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" onClick={closeMobileMenu}>
          <Image src="/assets/logo/logo.png" alt="CORE Media" width={150} height={100} priority />
        </Link>

        <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Link
            href="/about-us"
            className={`nav-link ${pathname === '/about-us' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            About
          </Link>

          <div
            className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}
            onMouseEnter={openServices}
            onMouseLeave={closeServices}
          >
            <button
              type="button"
              className={`nav-link ${isServicesPage ? 'active' : ''}`}
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((s) => !s)}
            >
              Services
              <ChevronDown
                size={16}
                style={{
                  transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel" onMouseEnter={openServices} onMouseLeave={closeServices}>
              <div className="mega-column">
                <ul>
                  <li>
                    <Link href="/survey-study" className="mega-item" onClick={closeMobileMenu}>
                      <span className="mega-icon" aria-hidden />
                      <span>Survey / Study</span>
                    </Link>
                  </li>

                  <li>
                    <Link href="/video" className="mega-item" onClick={closeMobileMenu}>
                      <span className="mega-icon" aria-hidden />
                      <span>Videos</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="https://ciodialogues.com/index.php/category/events/bespoke/"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>Bespoke Events</span>
                    </Link>
                  </li>

                  <li>
                    <Link href="/digital-marketing" className="mega-item" onClick={closeMobileMenu}>
                      <span className="mega-icon" aria-hidden />
                      <span>Digital Marketing</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Link
            href="/blog"
            className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Blogs
          </Link>

          <Link
            href="/events"
            className={`nav-link ${pathname === '/events' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Event
          </Link>
          <Link
            href="/videos"
            className={`nav-link ${pathname === '/videos' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Video
          </Link>

          {/* <Link
            href="/register"
            className={`nav-link ${pathname === '/register' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Registration
          </Link> */}
          {/* <Link href="/nominate" className="nav-link" onClick={() => setMobileOpen(false)}>
            Nomination
          </Link> */}

          <Link href="/contact" className="nav-link" onClick={closeMobileMenu}>
            Contact
          </Link>

          <div
            className={`nav-dropdown ${platformsOpen ? 'open' : ''}`}
            onMouseEnter={openPlatforms}
            onMouseLeave={closePlatforms}
          >
            <button
              type="button"
              className="nav-link"
              aria-expanded={platformsOpen}
              onClick={() => setPlatformsOpen((s) => !s)}
            >
              Our Platforms
              <ChevronDown
                size={16}
                style={{
                  transform: platformsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel" onMouseEnter={openPlatforms} onMouseLeave={closePlatforms}>
              <div className="mega-column">
                <ul>
                  <li>
                    <a
                      href="https://coremedia.uatcoremedia.vebsigns.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>Core Media</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ciopowerlist.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>CIO powerlist</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cio-choice.uatcoremedia.vebsigns.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>CIO Choice</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://leader-next.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>Leader Next</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ciocrown.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>CIO Crown</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ciodialogues.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>CIO Dialogues</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cxo-capital.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>CXO Capital</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cxo-capital.com/ciopowerlistmea/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>MEA CIO Powerlist</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mea.cio-choice.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>MEA CIO Choice</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://core-mediagroup.com/dccai2026/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>DCCAI 2026</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cioangelnetwork.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      <span className="mega-icon" aria-hidden />
                      <span>CIO Angel Network</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div className="navbar-actions">
          {/* <Link href="/about-us" className="about-btn" onClick={closeMobileMenu}>
            About Us
          </Link> */}

          <Link href="/#contact-section" className="talk-btn" onClick={closeMobileMenu}>
            <span>Let’s Talk</span>

            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>

          <button
            className={`menu-btn ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((s) => !s);
            }}
          >
            {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>
    </header>
  );
}
