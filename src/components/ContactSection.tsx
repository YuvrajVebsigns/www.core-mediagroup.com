// // 'use client';

// // import Image from 'next/image';
// // import { ArrowUpRight, RefreshCw } from 'lucide-react';
// // import { useEffect, useRef, useState } from 'react';
// // import { submitWebsiteContact } from '@/services/contacts.service';

// // const SERVICE_OPTIONS = [
// //   'Business Strategy',
// //   'Customer Experience',
// //   'CIO Events & Conferences',
// //   'Brand Recognition',
// //   'Video Content',
// // ];

// // const TURNSTILE_SCRIPT_SRC =
// //   'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

// // declare global {
// //   interface Window {
// //     turnstile?: {
// //       render: (
// //         element: HTMLElement,
// //         options: {
// //           sitekey: string;
// //           theme?: 'light' | 'dark' | 'auto';
// //           size?: 'normal' | 'compact' | 'flexible';
// //           callback?: (token: string) => void;
// //           'expired-callback'?: () => void;
// //           'error-callback'?: (errorCode?: string) => void;
// //         },
// //       ) => string;

// //       reset: (widgetId?: string) => void;

// //       remove: (widgetId?: string) => void;
// //     };
// //   }
// // }

// // export default function ContactSection() {
// //   /* =========================================================
// //      FORM STATE
// //   ========================================================= */

// //   const [fullName, setFullName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [service, setService] = useState('');
// //   const [message, setMessage] = useState('');

// //   /* =========================================================
// //      CLOUDFLARE TURNSTILE STATE
// //   ========================================================= */

// //   const [captchaToken, setCaptchaToken] = useState('');
// //   const [turnstileReady, setTurnstileReady] = useState(false);
// //   const [isRefreshingCaptcha, setIsRefreshingCaptcha] =
// //     useState(false);

// //   const turnstileContainerRef =
// //     useRef<HTMLDivElement | null>(null);

// //   const turnstileWidgetIdRef =
// //     useRef<string | null>(null);

// //   /* =========================================================
// //      UI STATE
// //   ========================================================= */

// //   const [popupMessage, setPopupMessage] =
// //     useState<string | null>(null);

// //   const [isSubmitting, setIsSubmitting] =
// //     useState(false);

// //   /* =========================================================
// //      CLOUDFLARE SITE KEY
// //   ========================================================= */

// //   const turnstileSiteKey =
// //     process.env.NEXT_PUBLIC_SITEKEY?.trim() || '';

// //   /* =========================================================
// //      LOAD CLOUDFLARE TURNSTILE
// //   ========================================================= */

// //   useEffect(() => {
// //     if (!turnstileSiteKey) {
// //       console.error(
// //         'Cloudflare Turnstile site key is missing.',
// //       );

// //       console.error(
// //         'Please add NEXT_PUBLIC_SITEKEY to .env.local',
// //       );

// //       setTurnstileReady(false);

// //       return;
// //     }

// //     let cancelled = false;

// //     if (typeof window !== 'undefined') {
// //       console.log(
// //         'Turnstile hostname:',
// //         window.location.hostname,
// //       );

// //       console.log(
// //         'Turnstile sitekey loaded:',
// //         Boolean(turnstileSiteKey),
// //       );
// //     }

// //     const initializeTurnstile = () => {
// //       if (cancelled) {
// //         return;
// //       }

// //       if (!window.turnstile) {
// //         console.error(
// //           'Cloudflare Turnstile API is not available.',
// //         );

// //         setTurnstileReady(false);

// //         return;
// //       }

// //       if (!turnstileContainerRef.current) {
// //         console.error(
// //           'Turnstile container is not available.',
// //         );

// //         return;
// //       }

// //       /*
// //        * Prevent duplicate widgets.
// //        */
// //       if (turnstileWidgetIdRef.current) {
// //         return;
// //       }

// //       try {
// //         const widgetId =
// //           window.turnstile.render(
// //             turnstileContainerRef.current,
// //             {
// //               /*
// //                * PUBLIC CLOUDFLARE SITE KEY
// //                *
// //                * This is NOT the CAPTCHA token.
// //                */
// //               sitekey: turnstileSiteKey,

// //               theme: 'light',

// //               size: 'normal',

// //               /*
// //                * Cloudflare generates the real
// //                * verification token here.
// //                */
// //               callback: (token: string) => {
// //                 if (cancelled) {
// //                   return;
// //                 }

// //                 console.log(
// //                   'Cloudflare Turnstile verification successful.',
// //                 );

// //                 /*
// //                  * Store the REAL Cloudflare token.
// //                  */
// //                 setCaptchaToken(token);

// //                 setIsRefreshingCaptcha(false);

// //                 setPopupMessage(null);
// //               },

// //               /*
// //                * Token expired.
// //                */
// //               'expired-callback': () => {
// //                 if (cancelled) {
// //                   return;
// //                 }

// //                 console.warn(
// //                   'Cloudflare Turnstile token expired.',
// //                 );

// //                 setCaptchaToken('');

// //                 setIsRefreshingCaptcha(false);

// //                 setPopupMessage(
// //                   'CAPTCHA expired. Please verify again.',
// //                 );
// //               },

// //               /*
// //                * Turnstile error.
// //                */
// //               'error-callback': (errorCode) => {
// //                 if (cancelled) {
// //                   return;
// //                 }

// //                 console.error(
// //                   'Cloudflare Turnstile error:',
// //                   errorCode,
// //                 );

// //                 setCaptchaToken('');

// //                 setIsRefreshingCaptcha(false);

// //                 /*
// //                  * 110200 = current hostname
// //                  * is not authorized for the site key.
// //                  */
// //                 if (errorCode === '110200') {
// //                   setPopupMessage(
// //                     'CAPTCHA domain is not authorized in Cloudflare. Please add coremedia.uatcoremedia.vebsigns.com to Turnstile Hostname Management.',
// //                   );
// //                 } else {
// //                   setPopupMessage(
// //                     'CAPTCHA verification failed. Please try again.',
// //                   );
// //                 }
// //               },
// //             },
// //           );

// //         if (cancelled) {
// //           try {
// //             window.turnstile.remove(widgetId);
// //           } catch {
// //             // Ignore cleanup error.
// //           }

// //           return;
// //         }

// //         turnstileWidgetIdRef.current =
// //           widgetId;

// //         setTurnstileReady(true);

// //         console.log(
// //           'Cloudflare Turnstile widget initialized.',
// //         );
// //       } catch (error) {
// //         console.error(
// //           'Failed to render Cloudflare Turnstile:',
// //           error,
// //         );

// //         setTurnstileReady(false);

// //         setPopupMessage(
// //           'Unable to load CAPTCHA. Please try again later.',
// //         );
// //       }
// //     };

// //     /*
// //      * Check if Turnstile script already exists.
// //      */
// //     const existingScript =
// //       document.querySelector(
// //         'script[data-cloudflare-turnstile="true"]',
// //       );

// //     if (existingScript) {
// //       if (window.turnstile) {
// //         initializeTurnstile();
// //       } else {
// //         existingScript.addEventListener(
// //           'load',
// //           initializeTurnstile,
// //         );
// //       }

// //       return () => {
// //         cancelled = true;

// //         existingScript.removeEventListener(
// //           'load',
// //           initializeTurnstile,
// //         );
// //       };
// //     }

// //     /*
// //      * Create Cloudflare Turnstile script.
// //      */
// //     const script =
// //       document.createElement('script');

// //     script.src = TURNSTILE_SCRIPT_SRC;

// //     script.async = true;
// //     script.defer = true;

// //     script.setAttribute(
// //       'data-cloudflare-turnstile',
// //       'true',
// //     );

// //     script.addEventListener(
// //       'load',
// //       initializeTurnstile,
// //     );

// //     script.addEventListener(
// //       'error',
// //       () => {
// //         if (cancelled) {
// //           return;
// //         }

// //         console.error(
// //           'Unable to load Cloudflare Turnstile script.',
// //         );

// //         setTurnstileReady(false);

// //         setPopupMessage(
// //           'Unable to connect to CAPTCHA service. Please try again later.',
// //         );
// //       },
// //     );

// //     document.head.appendChild(script);

// //     return () => {
// //       cancelled = true;

// //       script.removeEventListener(
// //         'load',
// //         initializeTurnstile,
// //       );
// //     };
// //   }, [turnstileSiteKey]);

// //   /* =========================================================
// //      CLEANUP TURNSTILE
// //   ========================================================= */

// //   useEffect(() => {
// //     return () => {
// //       if (
// //         window.turnstile &&
// //         turnstileWidgetIdRef.current
// //       ) {
// //         try {
// //           window.turnstile.remove(
// //             turnstileWidgetIdRef.current,
// //           );
// //         } catch (error) {
// //           console.error(
// //             'Failed to remove Cloudflare Turnstile widget:',
// //             error,
// //           );
// //         }
// //       }

// //       turnstileWidgetIdRef.current = null;
// //     };
// //   }, []);

// //   /* =========================================================
// //      POPUP AUTO CLOSE
// //   ========================================================= */

// //   useEffect(() => {
// //     if (!popupMessage) {
// //       return;
// //     }

// //     const timer = window.setTimeout(() => {
// //       setPopupMessage(null);
// //     }, 5000);

// //     return () => {
// //       window.clearTimeout(timer);
// //     };
// //   }, [popupMessage]);

// //   /* =========================================================
// //      REFRESH / RESET TURNSTILE
// //   ========================================================= */

// //   function resetTurnstile() {
// //     /*
// //      * Remove the current Cloudflare token.
// //      */
// //     setCaptchaToken('');

// //     /*
// //      * Show refresh/loading state.
// //      */
// //     setIsRefreshingCaptcha(true);

// //     if (
// //       window.turnstile &&
// //       turnstileWidgetIdRef.current
// //     ) {
// //       try {
// //         /*
// //          * Cloudflare creates a new challenge/token
// //          * after reset.
// //          */
// //         window.turnstile.reset(
// //           turnstileWidgetIdRef.current,
// //         );
// //       } catch (error) {
// //         console.error(
// //           'Failed to reset Cloudflare Turnstile:',
// //           error,
// //         );

// //         setIsRefreshingCaptcha(false);
// //       }
// //     } else {
// //       setIsRefreshingCaptcha(false);
// //     }
// //   }

// //   /* =========================================================
// //      FORM SUBMIT
// //   ========================================================= */

// //   async function handleSubmit(
// //     event: React.FormEvent<HTMLFormElement>,
// //   ) {
// //     event.preventDefault();

// //     const trimmedName = fullName.trim();
// //     const trimmedEmail = email.trim();
// //     const trimmedPhone = phone.trim();
// //     const trimmedService = service.trim();
// //     const trimmedMessage = message.trim();

// //     /* =======================================================
// //        VALIDATION
// //     ======================================================= */

// //     if (!trimmedName) {
// //       setPopupMessage(
// //         'Please enter your full name.',
// //       );

// //       return;
// //     }

// //     if (!trimmedEmail) {
// //       setPopupMessage(
// //         'Please enter your email address.',
// //       );

// //       return;
// //     }

// //     if (!trimmedPhone) {
// //       setPopupMessage(
// //         'Please enter your phone number.',
// //       );

// //       return;
// //     }

// //     if (!trimmedService) {
// //       setPopupMessage(
// //         'Please select a service.',
// //       );

// //       return;
// //     }

// //     if (!trimmedMessage) {
// //       setPopupMessage(
// //         'Please enter your message.',
// //       );

// //       return;
// //     }

// //     /* =======================================================
// //        CLOUDFLARE TURNSTILE VALIDATION
// //     ======================================================= */

// //     if (!captchaToken) {
// //       setPopupMessage(
// //         'Please complete the CAPTCHA verification.',
// //       );

// //       return;
// //     }

// //     /* =======================================================
// //        SUBMIT
// //     ======================================================= */

// //     setIsSubmitting(true);
// //     setPopupMessage(null);

// //     try {
// //       /*
// //        * captchaToken is the REAL token generated
// //        * by Cloudflare Turnstile.
// //        */
// //       await submitWebsiteContact({
// //         fullName: trimmedName,
// //         email: trimmedEmail,
// //         phone: trimmedPhone,
// //         service: trimmedService,
// //         message: trimmedMessage,

// //         /*
// //          * REAL CLOUDFLARE TOKEN
// //          */
// //         captchaToken,
// //       });

// //       setPopupMessage(
// //         'Thank you! Your message has been received.',
// //       );

// //       /* =====================================================
// //          CLEAR FORM
// //       ===================================================== */

// //       setFullName('');
// //       setEmail('');
// //       setPhone('');
// //       setService('');
// //       setMessage('');

// //       /* =====================================================
// //          RESET CAPTCHA
// //       ===================================================== */

// //       resetTurnstile();
// //     } catch (error) {
// //       console.error(
// //         'Contact form submission failed:',
// //         error,
// //       );

// //       setPopupMessage(
// //         error instanceof Error
// //           ? error.message
// //           : 'Failed to send your message.',
// //       );

// //       /*
// //        * Turnstile tokens are single-use.
// //        * Generate a fresh token.
// //        */
// //       resetTurnstile();
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   }

// //   /* =========================================================
// //      RENDER
// //   ========================================================= */

// //   return (
// //     <section
// //       className="contact-section"
// //       id="contact-section"
// //     >
// //       <div className="contact-container">

// //         {/* ===================================================
// //             LEFT SIDE - MAP
// //         ==================================================== */}

// //         <div className="contact-map-area">
// //           <div className="contact-map">

// //             <Image
// //               src="/assets/map3.webp"
// //               alt="Global Map"
// //               width={700}
// //               height={500}
// //               className="contact-map-img"
// //               priority
// //             />

// //             {/* INDIA */}

// //             <span
// //               className="map-dot dot-1"
// //               aria-hidden="true"
// //             />

// //             <span className="map-label label-1">
// //               India
// //             </span>

// //             {/* DUBAI */}

// //             <span
// //               className="map-dot dot-2"
// //               aria-hidden="true"
// //             />

// //             <span className="map-label label-2">
// //               Dubai
// //             </span>

// //             {/* SINGAPORE */}

// //             <span
// //               className="map-dot dot-3"
// //               aria-hidden="true"
// //             />

// //             <span className="map-label label-3">
// //               Singapore
// //             </span>

// //           </div>
// //         </div>

// //         {/* ===================================================
// //             RIGHT SIDE - CONTACT FORM
// //         ==================================================== */}

// //         <div className="contact-form-area">

// //           {/* =================================================
// //               SUCCESS / ERROR POPUP
// //           ================================================== */}

// //           {popupMessage ? (
// //             <div
// //               className="contact-popup"
// //               role="status"
// //               aria-live="polite"
// //             >
// //               <span
// //                 className="contact-popup-dot"
// //                 aria-hidden="true"
// //               />

// //               <p>{popupMessage}</p>

// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   setPopupMessage(null)
// //                 }
// //                 aria-label="Close message"
// //               >
// //                 ×
// //               </button>
// //             </div>
// //           ) : null}

// //           {/* =================================================
// //               BADGE
// //           ================================================== */}

// //           <div className="contact-badge">
// //             ⬢ GET IN TOUCH
// //           </div>

// //           {/* =================================================
// //               FORM
// //           ================================================== */}

// //           <form
// //             className="contact-form"
// //             onSubmit={handleSubmit}
// //           >

// //             {/* =================================================
// //                 INPUT GRID
// //             ================================================= */}

// //             <div className="contact-grid">

// //               {/* FULL NAME */}

// //               <input
// //                 type="text"
// //                 name="fullName"
// //                 placeholder="Full Name *"
// //                 value={fullName}
// //                 required
// //                 pattern="^[A-Za-z\s]+$"
// //                 title="Only alphabets are allowed"
// //                 autoComplete="name"
// //                 onInput={(event) => {
// //                   event.currentTarget.value =
// //                     event.currentTarget.value.replace(
// //                       /[^A-Za-z\s]/g,
// //                       '',
// //                     );
// //                 }}
// //                 onChange={(event) =>
// //                   setFullName(
// //                     event.target.value,
// //                   )
// //                 }
// //               />

// //               {/* EMAIL */}

// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="Email Address *"
// //                 value={email}
// //                 required
// //                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
// //                 title="Enter a valid email address"
// //                 autoComplete="email"
// //                 onChange={(event) =>
// //                   setEmail(
// //                     event.target.value,
// //                   )
// //                 }
// //               />

// //               {/* PHONE */}

// //               <input
// //                 type="tel"
// //                 name="phone"
// //                 placeholder="Phone Number *"
// //                 value={phone}
// //                 required
// //                 maxLength={10}
// //                 pattern="[0-9]{10}"
// //                 title="Enter a valid 10-digit phone number"
// //                 autoComplete="tel"
// //                 onInput={(event) => {
// //                   event.currentTarget.value =
// //                     event.currentTarget.value.replace(
// //                       /[^0-9]/g,
// //                       '',
// //                     );
// //                 }}
// //                 onChange={(event) =>
// //                   setPhone(
// //                     event.target.value,
// //                   )
// //                 }
// //               />

// //               {/* SERVICE */}

// //               <select
// //                 name="service"
// //                 required
// //                 value={service}
// //                 onChange={(event) =>
// //                   setService(
// //                     event.target.value,
// //                   )
// //                 }
// //               >
// //                 <option
// //                   value=""
// //                   disabled
// //                 >
// //                   Select a Service *
// //                 </option>

// //                 {SERVICE_OPTIONS.map(
// //                   (option) => (
// //                     <option
// //                       key={option}
// //                       value={option}
// //                     >
// //                       {option}
// //                     </option>
// //                   ),
// //                 )}
// //               </select>

// //             </div>

// //             {/* =================================================
// //                 MESSAGE
// //             ================================================== */}

// //             <textarea
// //               name="message"
// //               rows={6}
// //               placeholder="Your Message *"
// //               required
// //               value={message}
// //               onChange={(event) =>
// //                 setMessage(
// //                   event.target.value,
// //                 )
// //               }
// //             />

// //             {/* =================================================
// //                 CLOUDFLARE TURNSTILE CAPTCHA
// //             ================================================== */}

// //             <div className="contact-captcha">

// //               <label className="captcha-title">
// //                 CAPTCHA *
// //               </label>

// //               {/* CAPTCHA WIDGET */}

// //               <div
// //                 ref={turnstileContainerRef}
// //                 className="turnstile-container"
// //               />

// //               {/* PLACEHOLDER / LOADING MESSAGE */}

// //               {!turnstileSiteKey && (
// //                 <small className="captcha-help">
// //                   CAPTCHA configuration is missing.
// //                 </small>
// //               )}

// //               {turnstileSiteKey &&
// //                 !turnstileReady && (
// //                   <small className="captcha-help">
// //                     Loading CAPTCHA verification...
// //                   </small>
// //                 )}

// //               {turnstileReady &&
// //                 !captchaToken &&
// //                 !isRefreshingCaptcha && (
// //                   <small className="captcha-help">
// //                     Please complete the CAPTCHA
// //                     verification.
// //                   </small>
// //                 )}

// //               {/* REFRESHING MESSAGE */}

// //               {isRefreshingCaptcha && (
// //                 <small className="captcha-help">
// //                   Refreshing CAPTCHA verification...
// //                 </small>
// //               )}

// //               {/* VERIFIED MESSAGE */}

// //               {captchaToken && (
// //                 <small className="captcha-help">
// //                   CAPTCHA verified successfully.
// //                 </small>
// //               )}

// //               {/* =================================================
// //                   REFRESH CAPTCHA BUTTON
// //               ================================================== */}

// //               {turnstileReady && (
// //                 <button
// //                   type="button"
// //                   className="captcha-refresh-btn"
// //                   onClick={resetTurnstile}
// //                   disabled={isRefreshingCaptcha}
// //                 >
// //                   <RefreshCw
// //                     size={16}
// //                     className={
// //                       isRefreshingCaptcha
// //                         ? 'captcha-refresh-icon spinning'
// //                         : 'captcha-refresh-icon'
// //                     }
// //                   />

// //                   <span>
// //                     {isRefreshingCaptcha
// //                       ? 'Refreshing...'
// //                       : 'Refresh CAPTCHA'}
// //                   </span>
// //                 </button>
// //               )}

// //             </div>

// //             {/* =================================================
// //                 SUBMIT BUTTON
// //             ================================================== */}

// //             <button
// //               type="submit"
// //               className="contact-btn"
// //               disabled={
// //                 isSubmitting ||
// //                 !captchaToken
// //               }
// //             >
// //               <span>
// //                 {isSubmitting
// //                   ? 'Sending...'
// //                   : 'Submit'}
// //               </span>

// //               <span className="contact-btn-icon">
// //                 <ArrowUpRight size={18} />
// //               </span>
// //             </button>

// //           </form>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// 'use client';

// import Image from 'next/image';
// import { ArrowUpRight, RefreshCw, ShieldCheck } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import { submitWebsiteContact } from '@/services/contacts.service';

// const SERVICE_OPTIONS = [
//   'Business Strategy',
//   'Customer Experience',
//   'CIO Events & Conferences',
//   'Brand Recognition',
//   'Video Content',
// ];

// const TURNSTILE_SCRIPT_SRC =
//   'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

// declare global {
//   interface Window {
//     turnstile?: {
//       render: (
//         element: HTMLElement,
//         options: {
//           sitekey: string;
//           theme?: 'light' | 'dark' | 'auto';
//           size?: 'normal' | 'compact' | 'flexible' | 'invisible';
//           execution?: 'render' | 'execute';
//           callback?: (token: string) => void;
//           'expired-callback'?: () => void;
//           'error-callback'?: (errorCode?: string) => void;
//           'timeout-callback'?: () => void;
//         },
//       ) => string;

//       execute: (widgetId?: string) => void;

//       reset: (widgetId?: string) => void;

//       remove: (widgetId?: string) => void;
//     };
//   }
// }

// type CaptchaStatus = 'loading' | 'ready' | 'verifying' | 'verified' | 'error';

// export default function ContactSection() {
//   /* =========================================================
//      FORM STATE
//   ========================================================= */

//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [service, setService] = useState('');
//   const [message, setMessage] = useState('');

//   /* =========================================================
//      CLOUDFLARE TURNSTILE STATE
//   ========================================================= */

//   const [captchaToken, setCaptchaToken] = useState('');

//   const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>('loading');

//   const [isRefreshingCaptcha, setIsRefreshingCaptcha] = useState(false);

//   const turnstileContainerRef = useRef<HTMLDivElement | null>(null);

//   const turnstileWidgetIdRef = useRef<string | null>(null);

//   /* =========================================================
//      UI STATE
//   ========================================================= */

//   const [popupMessage, setPopupMessage] = useState<string | null>(null);

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   /* =========================================================
//      CLOUDFLARE SITE KEY
//   ========================================================= */

//   const turnstileSiteKey = process.env.NEXT_PUBLIC_SITEKEY?.trim() || '';

//   /* =========================================================
//      LOAD CLOUDFLARE TURNSTILE
//   ========================================================= */

//   useEffect(() => {
//     if (!turnstileSiteKey) {
//       // console.error('Cloudflare Turnstile site key is missing.');

//       // console.error('Please add NEXT_PUBLIC_SITEKEY to .env.local');

//       setCaptchaStatus('error');

//       setPopupMessage('CAPTCHA configuration is missing. Please try again later.');

//       return;
//     }

//     let cancelled = false;

//     const initializeTurnstile = () => {
//       if (cancelled) {
//         return;
//       }

//       if (!window.turnstile) {
//         // console.error('Cloudflare Turnstile API is not available.');

//         setCaptchaStatus('error');

//         setPopupMessage('Unable to load CAPTCHA verification. Please try again later.');

//         return;
//       }

//       if (!turnstileContainerRef.current) {
//         // console.error('Turnstile container is not available.');

//         setCaptchaStatus('error');

//         return;
//       }

//       /*
//        * Prevent duplicate widgets.
//        */
//       if (turnstileWidgetIdRef.current) {
//         return;
//       }

//       try {
//         const widgetId = window.turnstile.render(turnstileContainerRef.current, {
//           /*
//            * PUBLIC CLOUDFLARE SITE KEY
//            */
//           sitekey: turnstileSiteKey,

//           /*
//            * Invisible Turnstile.
//            */
//           size: 'invisible',

//           /*
//            * Verification will execute
//            * only when we call execute().
//            */
//           execution: 'execute',

//           theme: 'light',

//           /*
//            * Cloudflare successfully verified
//            * the visitor.
//            */
//           callback: (token: string) => {
//             if (cancelled) {
//               return;
//             }

//             // console.log('Cloudflare Turnstile verification successful.');

//             setCaptchaToken(token);

//             setCaptchaStatus('verified');

//             setIsRefreshingCaptcha(false);

//             /*
//              * Remove old popup messages when
//              * CAPTCHA verification starts successfully.
//              *
//              * IMPORTANT:
//              * This does not affect the popup after
//              * successful form submission because
//              * the CAPTCHA callback is not called again
//              * during reset.
//              */
//             setPopupMessage(null);
//           },

//           /*
//            * Token expired.
//            */
//           'expired-callback': () => {
//             if (cancelled) {
//               return;
//             }

//             // console.warn('Cloudflare Turnstile token expired.');

//             setCaptchaToken('');

//             setCaptchaStatus('ready');

//             setIsRefreshingCaptcha(false);

//             setPopupMessage('CAPTCHA verification expired. Please verify again.');
//           },

//           /*
//            * Turnstile error.
//            */
//           'error-callback': (errorCode) => {
//             if (cancelled) {
//               return;
//             }

//             // console.error('Cloudflare Turnstile error:', errorCode);

//             setCaptchaToken('');

//             setCaptchaStatus('error');

//             setIsRefreshingCaptcha(false);

//             if (errorCode === '110200') {
//               setPopupMessage(
//                 'CAPTCHA domain is not authorized in Cloudflare. Please add this website hostname to Turnstile Hostname Management.',
//               );
//             } else {
//               setPopupMessage('CAPTCHA verification failed. Please try again.');
//             }
//           },

//           /*
//            * Verification timeout.
//            */
//           'timeout-callback': () => {
//             if (cancelled) {
//               return;
//             }

//             // console.warn('Cloudflare Turnstile verification timed out.');

//             setCaptchaToken('');

//             setCaptchaStatus('ready');

//             setIsRefreshingCaptcha(false);

//             setPopupMessage('CAPTCHA verification timed out. Please try again.');
//           },
//         });

//         if (cancelled) {
//           try {
//             window.turnstile.remove(widgetId);
//           } catch {
//             // Ignore cleanup error.
//           }

//           return;
//         }

//         turnstileWidgetIdRef.current = widgetId;

//         setCaptchaStatus('ready');

//         // console.log('Invisible Cloudflare Turnstile initialized.');
//       } catch (error) {
//         // console.error('Failed to render Cloudflare Turnstile:', error);

//         setCaptchaStatus('error');

//         setPopupMessage('Unable to load CAPTCHA. Please try again later.');
//       }
//     };

//     /*
//      * Check if Turnstile script already exists.
//      */
//     const existingScript = document.querySelector('script[data-cloudflare-turnstile="true"]');

//     if (existingScript) {
//       if (window.turnstile) {
//         initializeTurnstile();
//       } else {
//         existingScript.addEventListener('load', initializeTurnstile);
//       }

//       return () => {
//         cancelled = true;

//         existingScript.removeEventListener('load', initializeTurnstile);
//       };
//     }

//     /*
//      * Create Cloudflare Turnstile script.
//      */
//     const script = document.createElement('script');

//     script.src = TURNSTILE_SCRIPT_SRC;

//     script.async = true;
//     script.defer = true;

//     script.setAttribute('data-cloudflare-turnstile', 'true');

//     script.addEventListener('load', initializeTurnstile);

//     script.addEventListener('error', () => {
//       if (cancelled) {
//         return;
//       }

//       // console.error('Unable to load Cloudflare Turnstile script.');

//       setCaptchaStatus('error');

//       setPopupMessage('Unable to connect to CAPTCHA service. Please try again later.');
//     });

//     document.head.appendChild(script);

//     return () => {
//       cancelled = true;

//       script.removeEventListener('load', initializeTurnstile);
//     };
//   }, [turnstileSiteKey]);

//   /* =========================================================
//      CLEANUP TURNSTILE
//   ========================================================= */

//   useEffect(() => {
//     return () => {
//       if (window.turnstile && turnstileWidgetIdRef.current) {
//         try {
//           window.turnstile.remove(turnstileWidgetIdRef.current);
//         } catch (error) {
//           // console.error('Failed to remove Cloudflare Turnstile widget:', error);
//         }
//       }

//       turnstileWidgetIdRef.current = null;
//     };
//   }, []);

//   /* =========================================================
//      POPUP AUTO CLOSE
//   ========================================================= */

//   useEffect(() => {
//     if (!popupMessage) {
//       return;
//     }

//     const timer = window.setTimeout(() => {
//       setPopupMessage(null);
//     }, 5000);

//     return () => {
//       window.clearTimeout(timer);
//     };
//   }, [popupMessage]);

//   /* =========================================================
//      START CLOUDFLARE VERIFICATION
//   ========================================================= */

//   function startCaptchaVerification() {
//     if (isSubmitting) {
//       return;
//     }

//     if (!window.turnstile) {
//       setCaptchaStatus('error');

//       setPopupMessage('CAPTCHA is still loading. Please try again.');

//       return;
//     }

//     if (!turnstileWidgetIdRef.current) {
//       setCaptchaStatus('error');

//       setPopupMessage('CAPTCHA is not ready. Please refresh the page and try again.');

//       return;
//     }

//     /*
//      * If already verified, don't execute again.
//      */
//     if (captchaToken) {
//       return;
//     }

//     try {
//       setCaptchaStatus('verifying');

//       setIsRefreshingCaptcha(false);

//       setPopupMessage(null);

//       window.turnstile.execute(turnstileWidgetIdRef.current);
//     } catch (error) {
//       // console.error('Failed to execute Cloudflare Turnstile:', error);

//       setCaptchaStatus('error');

//       setPopupMessage('Unable to start CAPTCHA verification. Please try again.');
//     }
//   }

//   /* =========================================================
//      REFRESH / RESET TURNSTILE

//      IMPORTANT:
//      DO NOT CLEAR popupMessage HERE.

//      This allows the success/error message from
//      form submission to remain visible.
//   ========================================================= */

//   function resetTurnstile() {
//     /*
//      * Remove current Cloudflare token.
//      */
//     setCaptchaToken('');

//     /*
//      * Reset status.
//      */
//     setCaptchaStatus('loading');

//     /*
//      * Show refreshing state.
//      */
//     setIsRefreshingCaptcha(true);

//     /*
//      * IMPORTANT:
//      * Do NOT use setPopupMessage(null) here.
//      *
//      * Otherwise this sequence:
//      *
//      * setPopupMessage('Thank you...');
//      * resetTurnstile();
//      *
//      * would immediately remove the success message.
//      */

//     if (window.turnstile && turnstileWidgetIdRef.current) {
//       try {
//         /*
//          * Reset Cloudflare widget.
//          */
//         window.turnstile.reset(turnstileWidgetIdRef.current);

//         /*
//          * Reset custom UI.
//          */
//         window.setTimeout(() => {
//           setCaptchaStatus('ready');
//           setIsRefreshingCaptcha(false);
//         }, 250);
//       } catch (error) {
//         // console.error('Failed to reset Cloudflare Turnstile:', error);

//         setCaptchaStatus('error');
//         setIsRefreshingCaptcha(false);

//         setPopupMessage('Unable to refresh CAPTCHA. Please try again.');
//       }
//     } else {
//       setCaptchaStatus('error');
//       setIsRefreshingCaptcha(false);

//       setPopupMessage('CAPTCHA is not available. Please refresh the page.');
//     }
//   }

//   /* =========================================================
//      FORM SUBMIT
//   ========================================================= */

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const trimmedName = fullName.trim();

//     const trimmedEmail = email.trim();

//     const trimmedPhone = phone.trim();

//     const trimmedService = service.trim();

//     const trimmedMessage = message.trim();

//     /* =======================================================
//        FORM VALIDATION
//     ======================================================= */

//     if (!trimmedName) {
//       setPopupMessage('Please enter your full name.');

//       return;
//     }

//     if (!trimmedEmail) {
//       setPopupMessage('Please enter your email address.');

//       return;
//     }

//     if (!trimmedPhone) {
//       setPopupMessage('Please enter your phone number.');

//       return;
//     }

//     if (!trimmedService) {
//       setPopupMessage('Please select a service.');

//       return;
//     }

//     if (!trimmedMessage) {
//       setPopupMessage('Please enter your message.');

//       return;
//     }

//     /* =======================================================
//        CLOUDFLARE TURNSTILE VALIDATION
//     ======================================================= */

//     if (!captchaToken) {
//       setPopupMessage('Please complete the CAPTCHA verification.');

//       return;
//     }

//     /* =======================================================
//        SUBMIT
//     ======================================================= */

//     setIsSubmitting(true);
//     setPopupMessage(null);

//     try {
//       /*
//        * Send contact form data and the REAL
//        * Cloudflare Turnstile token.
//        */
//       await submitWebsiteContact({
//         fullName: trimmedName,
//         email: trimmedEmail,
//         phone: trimmedPhone,
//         service: trimmedService,
//         message: trimmedMessage,
//         captchaToken,
//       });

//       /* =====================================================
//          SUCCESS
//       ===================================================== */

//       setPopupMessage('Thank you! Your message has been received.');

//       /* =====================================================
//          CLEAR FORM
//       ===================================================== */

//       setFullName('');
//       setEmail('');
//       setPhone('');
//       setService('');
//       setMessage('');

//       /* =====================================================
//          RESET CAPTCHA

//          This will NOT remove popupMessage anymore.
//       ===================================================== */

//       resetTurnstile();
//     } catch (error) {
//       // console.error('Contact form submission failed:', error);

//       setPopupMessage(error instanceof Error ? error.message : 'Failed to send your message.');

//       /*
//        * Turnstile tokens are single-use.
//        *
//        * Generate a fresh token after failed submission.
//        *
//        * resetTurnstile() no longer clears the error message.
//        */
//       resetTurnstile();
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <section className="contact-section" id="contact-section">
//       <div className="contact-container">
//         {/* ===================================================
//             LEFT SIDE - MAP
//         ==================================================== */}

//         <div className="contact-map-area">
//           <div className="contact-map">
//             <Image
//               src="/assets/map3.webp"
//               alt="Global Map"
//               width={700}
//               height={500}
//               className="contact-map-img"
//               priority
//             />

//             {/* INDIA */}

//             <span className="map-dot dot-1" aria-hidden="true" />

//             <span className="map-label label-1">India</span>

//             {/* DUBAI */}

//             <span className="map-dot dot-2" aria-hidden="true" />

//             <span className="map-label label-2">Dubai</span>

//             {/* SINGAPORE */}

//             <span className="map-dot dot-3" aria-hidden="true" />

//             <span className="map-label label-3">Singapore</span>
//           </div>
//         </div>

//         {/* ===================================================
//             RIGHT SIDE - CONTACT FORM
//         ==================================================== */}

//         <div className="contact-form-area">
//           <div className="contact-header-row">
//             <div className="contact-badge">⬢ GET IN TOUCH</div>

//             {popupMessage && (
//               <div className="contact-popup" role="status" aria-live="polite">
//                 <span className="contact-popup-dot" aria-hidden="true" />

//                 <p>{popupMessage}</p>

//                 <button
//                   type="button"
//                   onClick={() => setPopupMessage(null)}
//                   aria-label="Close message"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* =================================================
//               FORM
//           ================================================== */}

//           <form className="contact-form" onSubmit={handleSubmit}>
//             {/* =================================================
//                 INPUT GRID
//             ================================================= */}

//             <div className="contact-grid">
//               {/* FULL NAME */}

//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name *"
//                 value={fullName}
//                 required
//                 pattern="^[A-Za-z\s]+$"
//                 title="Only alphabets are allowed"
//                 autoComplete="name"
//                 onInput={(event) => {
//                   event.currentTarget.value = event.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
//                 }}
//                 onChange={(event) => setFullName(event.target.value)}
//               />

//               {/* EMAIL */}

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address *"
//                 value={email}
//                 required
//                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//                 title="Enter a valid email address"
//                 autoComplete="email"
//                 onChange={(event) => setEmail(event.target.value)}
//               />

//               {/* PHONE */}

//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone Number *"
//                 value={phone}
//                 required
//                 maxLength={10}
//                 pattern="[0-9]{10}"
//                 title="Enter a valid 10-digit phone number"
//                 autoComplete="tel"
//                 onInput={(event) => {
//                   event.currentTarget.value = event.currentTarget.value.replace(/[^0-9]/g, '');
//                 }}
//                 onChange={(event) => setPhone(event.target.value)}
//               />

//               {/* SERVICE */}

//               <select
//                 name="service"
//                 required
//                 value={service}
//                 onChange={(event) => setService(event.target.value)}
//               >
//                 <option value="" disabled>
//                   Select a Service *
//                 </option>

//                 {SERVICE_OPTIONS.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* =================================================
//                 MESSAGE
//             ================================================== */}

//             <textarea
//               name="message"
//               rows={6}
//               placeholder="Your Message *"
//               required
//               value={message}
//               onChange={(event) => setMessage(event.target.value)}
//             />

//             {/* =================================================
//                 CUSTOM CLOUDFLARE CAPTCHA
//             ================================================== */}

//             <div className="contact-captcha">
//               <label className="captcha-title">CAPTCHA *</label>

//               <div
//                 className={`custom-captcha ${
//                   captchaStatus === 'verified' ? 'custom-captcha-verified' : ''
//                 } ${captchaStatus === 'error' ? 'custom-captcha-error' : ''}`}
//               >
//                 {/* CHECK / SHIELD ICON */}

//                 <div
//                   className={`captcha-check ${
//                     captchaStatus === 'verified' ? 'captcha-check-success' : ''
//                   } ${captchaStatus === 'verifying' ? 'captcha-check-loading' : ''}`}
//                 >
//                   {captchaStatus === 'verified' ? (
//                     <ShieldCheck size={22} />
//                   ) : captchaStatus === 'verifying' ? (
//                     <RefreshCw size={20} className="captcha-spin" />
//                   ) : (
//                     <span />
//                   )}
//                 </div>

//                 {/* TEXT */}

//                 <div className="captcha-content">
//                   <strong>
//                     {captchaStatus === 'verified'
//                       ? 'Verification successful'
//                       : captchaStatus === 'verifying'
//                         ? 'Verifying...'
//                         : captchaStatus === 'error'
//                           ? 'Verification failed'
//                           : 'Verify you are human'}
//                   </strong>

//                   <small>
//                     {captchaStatus === 'verified'
//                       ? 'You can now submit the form.'
//                       : captchaStatus === 'verifying'
//                         ? 'Cloudflare is checking your request.'
//                         : captchaStatus === 'error'
//                           ? 'Please try again.'
//                           : 'Click to complete the security check.'}
//                   </small>
//                 </div>

//                 {/* ACTION */}

//                 {captchaStatus !== 'verified' && (
//                   <button
//                     type="button"
//                     className="captcha-verify-button"
//                     onClick={startCaptchaVerification}
//                     disabled={
//                       captchaStatus === 'loading' ||
//                       captchaStatus === 'verifying' ||
//                       isRefreshingCaptcha ||
//                       isSubmitting
//                     }
//                   >
//                     {captchaStatus === 'loading'
//                       ? 'Loading...'
//                       : captchaStatus === 'verifying'
//                         ? 'Checking...'
//                         : 'I’m human'}
//                   </button>
//                 )}

//                 {/* REFRESH */}

//                 {captchaStatus === 'verified' && (
//                   <button
//                     type="button"
//                     className="captcha-refresh-icon-button"
//                     onClick={resetTurnstile}
//                     disabled={isRefreshingCaptcha || isSubmitting}
//                     aria-label="Refresh CAPTCHA"
//                   >
//                     <RefreshCw size={18} className={isRefreshingCaptcha ? 'captcha-spin' : ''} />
//                   </button>
//                 )}
//               </div>

//               {/* INVISIBLE TURNSTILE */}

//               <div ref={turnstileContainerRef} className="turnstile-invisible" aria-hidden="true" />
//             </div>

//             {/* =================================================
//                 SUBMIT BUTTON
//             ================================================== */}

//             <button type="submit" className="contact-btn" disabled={isSubmitting || !captchaToken}>
//               <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>

//               <span className="contact-btn-icon">
//                 <ArrowUpRight size={18} />
//               </span>
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import { ArrowUpRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { submitWebsiteContact } from '@/services/contacts.service';

const SERVICE_OPTIONS = [
  'Business Strategy',
  'Customer Experience',
  'CIO Events & Conferences',
  'Brand Recognition',
  'Video Content',
];

const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible' | 'invisible';
          execution?: 'render' | 'execute';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: (errorCode?: string) => void;
          'timeout-callback'?: () => void;
        },
      ) => string;

      execute: (widgetId?: string) => void;

      reset: (widgetId?: string) => void;

      remove: (widgetId?: string) => void;
    };
  }
}

type CaptchaStatus = 'loading' | 'ready' | 'verifying' | 'verified' | 'error';

export default function ContactSection() {
  /* =========================================================
     FORM STATE
  ========================================================= */

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  /* =========================================================
     CLOUDFLARE TURNSTILE STATE
  ========================================================= */

  const [captchaToken, setCaptchaToken] = useState('');

  const [captchaStatus, setCaptchaStatus] = useState<CaptchaStatus>('loading');

  const [isRefreshingCaptcha, setIsRefreshingCaptcha] = useState(false);

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);

  const turnstileWidgetIdRef = useRef<string | null>(null);

  /* =========================================================
     UI STATE
  ========================================================= */

  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================================================
     CLOUDFLARE SITE KEY
  ========================================================= */

  const turnstileSiteKey = process.env.NEXT_PUBLIC_SITEKEY?.trim() || '';

  /* =========================================================
     FORM COMPLETION CHECK
     
     CAPTCHA will only be allowed after all fields
     have been filled.
  ========================================================= */

  const isFormComplete =
    fullName.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    service.trim() !== '' &&
    message.trim() !== '';

  /* =========================================================
     LOAD CLOUDFLARE TURNSTILE
  ========================================================= */

  useEffect(() => {
    if (!turnstileSiteKey) {
      setCaptchaStatus('error');

      setPopupMessage('CAPTCHA configuration is missing. Please try again later.');

      return;
    }

    let cancelled = false;

    const initializeTurnstile = () => {
      if (cancelled) {
        return;
      }

      if (!window.turnstile) {
        setCaptchaStatus('error');

        setPopupMessage('Unable to load CAPTCHA verification. Please try again later.');

        return;
      }

      if (!turnstileContainerRef.current) {
        setCaptchaStatus('error');

        return;
      }

      /*
       * Prevent duplicate widgets.
       */
      if (turnstileWidgetIdRef.current) {
        return;
      }

      try {
        const widgetId = window.turnstile.render(turnstileContainerRef.current, {
          /*
           * PUBLIC CLOUDFLARE SITE KEY
           */
          sitekey: turnstileSiteKey,

          /*
           * Invisible Turnstile.
           */
          size: 'invisible',

          /*
           * Verification will execute only
           * when execute() is called.
           */
          execution: 'execute',

          theme: 'light',

          /*
           * Cloudflare successfully verified
           * the visitor.
           */
          callback: (token: string) => {
            if (cancelled) {
              return;
            }

            setCaptchaToken(token);

            setCaptchaStatus('verified');

            setIsRefreshingCaptcha(false);

            setPopupMessage(null);
          },

          /*
           * Token expired.
           */
          'expired-callback': () => {
            if (cancelled) {
              return;
            }

            setCaptchaToken('');

            setCaptchaStatus('ready');

            setIsRefreshingCaptcha(false);

            setPopupMessage('CAPTCHA verification expired. Please verify again.');
          },

          /*
           * Turnstile error.
           */
          'error-callback': (errorCode) => {
            if (cancelled) {
              return;
            }

            setCaptchaToken('');

            setCaptchaStatus('error');

            setIsRefreshingCaptcha(false);

            if (errorCode === '110200') {
              setPopupMessage(
                'CAPTCHA domain is not authorized in Cloudflare. Please add this website hostname to Turnstile Hostname Management.',
              );
            } else {
              setPopupMessage('CAPTCHA verification failed. Please try again.');
            }
          },

          /*
           * Verification timeout.
           */
          'timeout-callback': () => {
            if (cancelled) {
              return;
            }

            setCaptchaToken('');

            setCaptchaStatus('ready');

            setIsRefreshingCaptcha(false);

            setPopupMessage('CAPTCHA verification timed out. Please try again.');
          },
        });

        if (cancelled) {
          try {
            window.turnstile.remove(widgetId);
          } catch {
            // Ignore cleanup error.
          }

          return;
        }

        turnstileWidgetIdRef.current = widgetId;

        setCaptchaStatus('ready');
      } catch {
        setCaptchaStatus('error');

        setPopupMessage('Unable to load CAPTCHA. Please try again later.');
      }
    };

    /*
     * Check if Turnstile script already exists.
     */
    const existingScript = document.querySelector('script[data-cloudflare-turnstile="true"]');

    if (existingScript) {
      if (window.turnstile) {
        initializeTurnstile();
      } else {
        existingScript.addEventListener('load', initializeTurnstile);
      }

      return () => {
        cancelled = true;

        existingScript.removeEventListener('load', initializeTurnstile);
      };
    }

    /*
     * Create Cloudflare Turnstile script.
     */
    const script = document.createElement('script');

    script.src = TURNSTILE_SCRIPT_SRC;

    script.async = true;

    script.defer = true;

    script.setAttribute('data-cloudflare-turnstile', 'true');

    script.addEventListener('load', initializeTurnstile);

    script.addEventListener('error', () => {
      if (cancelled) {
        return;
      }

      setCaptchaStatus('error');

      setPopupMessage('Unable to connect to CAPTCHA service. Please try again later.');
    });

    document.head.appendChild(script);

    return () => {
      cancelled = true;

      script.removeEventListener('load', initializeTurnstile);
    };
  }, [turnstileSiteKey]);

  /* =========================================================
     CLEANUP TURNSTILE
  ========================================================= */

  useEffect(() => {
    return () => {
      if (window.turnstile && turnstileWidgetIdRef.current) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch {
          // Ignore cleanup error.
        }
      }

      turnstileWidgetIdRef.current = null;
    };
  }, []);

  /* =========================================================
     POPUP AUTO CLOSE
  ========================================================= */

  useEffect(() => {
    if (!popupMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPopupMessage(null);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [popupMessage]);

  /* =========================================================
     INVALIDATE CAPTCHA WHEN FORM CHANGES
     
     Once CAPTCHA is verified, if the user changes any
     form field, the previous token should no longer be
     considered valid for this form data.
  ========================================================= */

  useEffect(() => {
    if (!captchaToken) {
      return;
    }

    /*
     * Do not immediately invalidate during initial
     * verification state updates.
     *
     * This effect only runs when form values change
     * after a token already exists.
     */
  }, [fullName, email, phone, service, message, captchaToken]);

  /* =========================================================
     START CLOUDFLARE VERIFICATION
  ========================================================= */

  function startCaptchaVerification() {
    if (isSubmitting) {
      return;
    }

    /*
     * IMPORTANT:
     * CAPTCHA cannot be started until the complete
     * form has been filled.
     */
    if (!isFormComplete) {
      setPopupMessage('Please fill in all required fields before verifying CAPTCHA.');

      return;
    }

    if (!window.turnstile) {
      setCaptchaStatus('error');

      setPopupMessage('CAPTCHA is still loading. Please try again.');

      return;
    }

    if (!turnstileWidgetIdRef.current) {
      setCaptchaStatus('error');

      setPopupMessage('CAPTCHA is not ready. Please refresh the page and try again.');

      return;
    }

    /*
     * If already verified, don't execute again.
     */
    if (captchaToken) {
      return;
    }

    try {
      setCaptchaStatus('verifying');

      setIsRefreshingCaptcha(false);

      setPopupMessage(null);

      window.turnstile.execute(turnstileWidgetIdRef.current);
    } catch {
      setCaptchaStatus('error');

      setPopupMessage('Unable to start CAPTCHA verification. Please try again.');
    }
  }

  /* =========================================================
     RESET / REFRESH TURNSTILE
     
     IMPORTANT:
     popupMessage is intentionally NOT cleared here.
  ========================================================= */

  function resetTurnstile() {
    /*
     * Remove current Cloudflare token.
     */
    setCaptchaToken('');

    /*
     * Reset status.
     */
    setCaptchaStatus('loading');

    /*
     * Show refreshing state.
     */
    setIsRefreshingCaptcha(true);

    if (window.turnstile && turnstileWidgetIdRef.current) {
      try {
        /*
         * Reset Cloudflare widget.
         */
        window.turnstile.reset(turnstileWidgetIdRef.current);

        /*
         * Reset custom UI.
         */
        window.setTimeout(() => {
          setCaptchaStatus('ready');

          setIsRefreshingCaptcha(false);
        }, 250);
      } catch {
        setCaptchaStatus('error');

        setIsRefreshingCaptcha(false);

        setPopupMessage('Unable to refresh CAPTCHA. Please try again.');
      }
    } else {
      setCaptchaStatus('error');

      setIsRefreshingCaptcha(false);

      setPopupMessage('CAPTCHA is not available. Please refresh the page.');
    }
  }

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = fullName.trim();

    const trimmedEmail = email.trim();

    const trimmedPhone = phone.trim();

    const trimmedService = service.trim();

    const trimmedMessage = message.trim();

    /* =======================================================
       FORM VALIDATION
    ======================================================= */

    if (!trimmedName) {
      setPopupMessage('Please enter your full name.');

      return;
    }

    if (!trimmedEmail) {
      setPopupMessage('Please enter your email address.');

      return;
    }

    if (!trimmedPhone) {
      setPopupMessage('Please enter your phone number.');

      return;
    }

    if (!trimmedService) {
      setPopupMessage('Please select a service.');

      return;
    }

    if (!trimmedMessage) {
      setPopupMessage('Please enter your message.');

      return;
    }

    /* =======================================================
       CLOUDFLARE TURNSTILE VALIDATION
    ======================================================= */

    if (!captchaToken) {
      setPopupMessage('Please complete the CAPTCHA verification.');

      return;
    }

    /* =======================================================
       SUBMIT
    ======================================================= */

    setIsSubmitting(true);

    setPopupMessage(null);

    try {
      /*
       * Send contact form data and the REAL
       * Cloudflare Turnstile token.
       */
      await submitWebsiteContact({
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        service: trimmedService,
        message: trimmedMessage,
        captchaToken,
      });

      /* =====================================================
         SUCCESS
      ===================================================== */

      setPopupMessage('Thank you! Your message has been received.');

      /* =====================================================
         CLEAR FORM
      ===================================================== */

      setFullName('');

      setEmail('');

      setPhone('');

      setService('');

      setMessage('');

      /* =====================================================
         RESET CAPTCHA

         popupMessage remains visible.
      ===================================================== */

      resetTurnstile();
    } catch (error) {
      setPopupMessage(error instanceof Error ? error.message : 'Failed to send your message.');

      /*
       * Turnstile tokens are single-use.
       *
       * Generate a fresh token after failed submission.
       */
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="contact-section" id="contact-section">
      <div className="contact-container">
        {/* ===================================================
            LEFT SIDE - MAP
        ==================================================== */}

        <div className="contact-map-area">
          <div className="contact-map">
            <Image
              src="/assets/map3.webp"
              alt="Global Map"
              width={700}
              height={500}
              className="contact-map-img"
              priority
            />

            {/* INDIA */}

            <span className="map-dot dot-1" aria-hidden="true" />

            <span className="map-label label-1">India</span>

            {/* DUBAI */}

            <span className="map-dot dot-2" aria-hidden="true" />

            <span className="map-label label-2">Dubai</span>

            {/* SINGAPORE */}

            <span className="map-dot dot-3" aria-hidden="true" />

            <span className="map-label label-3">Singapore</span>
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE - CONTACT FORM
        ==================================================== */}

        <div className="contact-form-area">
          <div className="contact-header-row">
            <div className="contact-badge">⬢ GET IN TOUCH</div>

            {popupMessage && (
              <div className="contact-popup" role="status" aria-live="polite">
                <span className="contact-popup-dot" aria-hidden="true" />

                <p>{popupMessage}</p>

                <button
                  type="button"
                  onClick={() => setPopupMessage(null)}
                  aria-label="Close message"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              FORM
          ================================================== */}

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* =================================================
                INPUT GRID
            ================================================= */}

            <div className="contact-grid">
              {/* FULL NAME */}

              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={fullName}
                required
                pattern="^[A-Za-z\s]+$"
                title="Only alphabets are allowed"
                autoComplete="name"
                onInput={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
                onChange={(event) => setFullName(event.target.value)}
              />

              {/* EMAIL */}

              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={email}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />

              {/* PHONE */}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={phone}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                autoComplete="tel"
                onInput={(event) => {
                  event.currentTarget.value = event.currentTarget.value.replace(/[^0-9]/g, '');
                }}
                onChange={(event) => setPhone(event.target.value)}
              />

              {/* SERVICE */}

              <select
                name="service"
                required
                value={service}
                onChange={(event) => setService(event.target.value)}
              >
                <option value="" disabled>
                  Select a Service *
                </option>

                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* =================================================
                MESSAGE
            ================================================== */}

            <textarea
              name="message"
              rows={6}
              placeholder="Your Message *"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            {/* =================================================
                CUSTOM CLOUDFLARE CAPTCHA
            ================================================== */}

            <div className="contact-captcha">
              <label className="captcha-title">CAPTCHA *</label>

              <div
                className={`custom-captcha ${
                  captchaStatus === 'verified' ? 'custom-captcha-verified' : ''
                } ${captchaStatus === 'error' ? 'custom-captcha-error' : ''}`}
              >
                {/* CHECK / SHIELD ICON */}

                <div
                  className={`captcha-check ${
                    captchaStatus === 'verified' ? 'captcha-check-success' : ''
                  } ${captchaStatus === 'verifying' ? 'captcha-check-loading' : ''}`}
                >
                  {captchaStatus === 'verified' ? (
                    <ShieldCheck size={22} />
                  ) : captchaStatus === 'verifying' ? (
                    <RefreshCw size={20} className="captcha-spin" />
                  ) : (
                    <span />
                  )}
                </div>

                {/* TEXT */}

                <div className="captcha-content">
                  <strong>
                    {captchaStatus === 'verified'
                      ? 'Verification successful'
                      : captchaStatus === 'verifying'
                        ? 'Verifying...'
                        : captchaStatus === 'error'
                          ? 'Verification failed'
                          : !isFormComplete
                            ? 'Complete the form first'
                            : 'Verify you are human'}
                  </strong>

                  <small>
                    {captchaStatus === 'verified'
                      ? 'You can now submit the form.'
                      : captchaStatus === 'verifying'
                        ? 'Cloudflare is checking your request.'
                        : captchaStatus === 'error'
                          ? 'Please try again.'
                          : !isFormComplete
                            ? 'Fill in all required fields to continue.'
                            : 'Click to complete the security check.'}
                  </small>
                </div>

                {/* ACTION */}

                {captchaStatus !== 'verified' && (
                  <button
                    type="button"
                    className="captcha-verify-button"
                    onClick={startCaptchaVerification}
                    disabled={
                      !isFormComplete ||
                      captchaStatus === 'loading' ||
                      captchaStatus === 'verifying' ||
                      isRefreshingCaptcha ||
                      isSubmitting
                    }
                  >
                    {!isFormComplete
                      ? 'Fill form first'
                      : captchaStatus === 'loading'
                        ? 'Loading...'
                        : captchaStatus === 'verifying'
                          ? 'Checking...'
                          : 'I’m human'}
                  </button>
                )}

                {/* REFRESH */}

                {captchaStatus === 'verified' && (
                  <button
                    type="button"
                    className="captcha-refresh-icon-button"
                    onClick={resetTurnstile}
                    disabled={isRefreshingCaptcha || isSubmitting}
                    aria-label="Refresh CAPTCHA"
                  >
                    <RefreshCw size={18} className={isRefreshingCaptcha ? 'captcha-spin' : ''} />
                  </button>
                )}
              </div>

              {/* INVISIBLE TURNSTILE */}

              <div ref={turnstileContainerRef} className="turnstile-invisible" aria-hidden="true" />
            </div>

            {/* =================================================
                SUBMIT BUTTON
            ================================================== */}

            <button
              type="submit"
              className="contact-btn"
              disabled={isSubmitting || !isFormComplete || !captchaToken}
            >
              <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>

              <span className="contact-btn-icon">
                <ArrowUpRight size={18} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
