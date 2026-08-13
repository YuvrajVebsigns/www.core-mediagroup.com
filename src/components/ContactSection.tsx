// // 'use client';

// // import Image from 'next/image';
// // import { ArrowUpRight } from 'lucide-react';
// // import { useEffect, useState } from 'react';
// // import { submitWebsiteContact } from '@/services/contacts.service';

// // const SERVICE_OPTIONS = [
// //   'Business Strategy',
// //   'Customer Experience',
// //   'CIO Events & Conferences',
// //   'Brand Recognition',
// //   'Video Content',
// // ];

// // export default function ContactSection() {
// //   const [fullName, setFullName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [service, setService] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [popupMessage, setPopupMessage] = useState<string | null>(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   useEffect(() => {
// //     if (!popupMessage) return;

// //     const timer = window.setTimeout(() => {
// //       setPopupMessage(null);
// //     }, 3200);

// //     return () => window.clearTimeout(timer);
// //   }, [popupMessage]);

// //   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
// //     event.preventDefault();

// //     const trimmedName = fullName.trim();
// //     const trimmedEmail = email.trim();
// //     const trimmedPhone = phone.trim();
// //     const trimmedService = service.trim();
// //     const trimmedMessage = message.trim();

// //     if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedService || !trimmedMessage) {
// //       setPopupMessage('Please fill in all required fields.');
// //       return;
// //     }

// //     setIsSubmitting(true);
// //     setPopupMessage(null);

// //     try {
// //       await submitWebsiteContact({
// //         fullName: trimmedName,
// //         email: trimmedEmail,
// //         phone: trimmedPhone,
// //         service: trimmedService,
// //         message: trimmedMessage,
// //       });

// //       setPopupMessage('Thank you! Your message has been received.');
// //       setFullName('');
// //       setEmail('');
// //       setPhone('');
// //       setService('');
// //       setMessage('');
// //     } catch (error) {
// //       setPopupMessage(error instanceof Error ? error.message : 'Failed to send your message.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   }
// //   return (
// //     <section className="contact-section" id="contact-section">
// //       <div className="contact-container">
// //         {/* LEFT SIDE */}
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

// //             {/* Dots */}
// //             <span className="map-dot dot-1"></span>
// //             <span className="map-label label-1">India</span>

// //             <span className="map-dot dot-2"></span>
// //             <span className="map-label label-2">Dubai</span>

// //             <span className="map-dot dot-3"></span>
// //             <span className="map-label label-3">Singapore</span>
// //           </div>
// //         </div>

// //         {/* RIGHT SIDE */}
// //         <div className="contact-form-area">
// //           {popupMessage ? (
// //             <div className="contact-popup" role="status" aria-live="polite">
// //               <span className="contact-popup-dot" aria-hidden="true" />
// //               <p>{popupMessage}</p>
// //               <button
// //                 type="button"
// //                 onClick={() => setPopupMessage(null)}
// //                 aria-label="Close message"
// //               >
// //                 ×
// //               </button>
// //             </div>
// //           ) : null}

// //           {/* Badge */}
// //           <div className="contact-badge">⬢ GET IN TOUCH</div>

// //           {/* Title */}
// //           {/* <h2 className="contact-title">Let’s Start a Conversation</h2> */}

// //           {/* Form */}
// //           <form className="contact-form" onSubmit={handleSubmit}>
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
// //                 onInput={(e) => {
// //                   e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
// //                 }}
// //                 onChange={(e) => setFullName(e.target.value)}
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
// //                 onChange={(e) => setEmail(e.target.value)}
// //               />

// //               {/* PHONE NUMBER */}
// //               <input
// //                 type="tel"
// //                 name="phone"
// //                 placeholder="Phone Number *"
// //                 value={phone}
// //                 required
// //                 maxLength={10}
// //                 pattern="[0-9]{10}"
// //                 title="Enter a valid 10-digit phone number"
// //                 onInput={(e) => {
// //                   e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
// //                 }}
// //                 onChange={(e) => setPhone(e.target.value)}
// //               />

// //               {/* SELECT */}
// //               <select required value={service} onChange={(e) => setService(e.target.value)}>
// //                 <option value="" disabled>
// //                   Select a Service *
// //                 </option>

// //                 {SERVICE_OPTIONS.map((option) => (
// //                   <option key={option} value={option}>
// //                     {option}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* MESSAGE */}
// //             <textarea
// //               rows={6}
// //               placeholder="Your Message *"
// //               required
// //               value={message}
// //               onChange={(e) => setMessage(e.target.value)}
// //             />

// //             {/* BUTTON */}
// //             <button type="submit" className="contact-btn" disabled={isSubmitting}>
// //               <span>{isSubmitting ? 'Sending...' : 'Submit '}</span>

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
// import { ArrowUpRight, RefreshCw } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { submitWebsiteContact } from '@/services/contacts.service';

// const SERVICE_OPTIONS = [
//   'Business Strategy',
//   'Customer Experience',
//   'CIO Events & Conferences',
//   'Brand Recognition',
//   'Video Content',
// ];

// const TEST_CAPTCHA_TOKEN =
//   '1_1_00000000000000000000000000000000000000000';

// function generateCaptchaText(length = 6) {
//   const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

//   let result = '';

//   for (let index = 0; index < length; index += 1) {
//     result += characters.charAt(
//       Math.floor(Math.random() * characters.length),
//     );
//   }

//   return result;
// }

// function createCaptchaSvg(text: string) {
//   const width = 220;
//   const height = 70;

//   const backgroundLines = Array.from({ length: 7 }, (_, index) => {
//     const x1 = Math.random() * width;
//     const y1 = Math.random() * height;
//     const x2 = Math.random() * width;
//     const y2 = Math.random() * height;

//     return `
//       <line
//         x1="${x1}"
//         y1="${y1}"
//         x2="${x2}"
//         y2="${y2}"
//         stroke="#777"
//         stroke-width="1.5"
//         opacity="0.55"
//       />
//     `;
//   }).join('');

//   const dots = Array.from({ length: 35 }, () => {
//     const cx = Math.random() * width;
//     const cy = Math.random() * height;
//     const radius = Math.random() * 1.8 + 0.5;

//     return `
//       <circle
//         cx="${cx}"
//         cy="${cy}"
//         r="${radius}"
//         fill="#555"
//         opacity="0.55"
//       />
//     `;
//   }).join('');

//   const characters = text
//     .split('')
//     .map((character, index) => {
//       const x = 28 + index * 30;
//       const y = 45 + (Math.random() * 10 - 5);
//       const rotation = Math.random() * 30 - 15;

//       return `
//         <text
//           x="${x}"
//           y="${y}"
//           font-family="Arial, sans-serif"
//           font-size="30"
//           font-weight="700"
//           fill="#222"
//           transform="rotate(${rotation} ${x} ${y})"
//         >
//           ${character}
//         </text>
//       `;
//     })
//     .join('');

//   const svg = `
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="${width}"
//       height="${height}"
//       viewBox="0 0 ${width} ${height}"
//     >
//       <rect
//         width="${width}"
//         height="${height}"
//         fill="#f4f4f4"
//       />

//       ${backgroundLines}
//       ${dots}
//       ${characters}
//     </svg>
//   `;

//   return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
// }

// export default function ContactSection() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [service, setService] = useState('');
//   const [message, setMessage] = useState('');

//   const [captchaText, setCaptchaText] = useState('');
//   const [captchaAnswer, setCaptchaAnswer] = useState('');
//   const [captchaImage, setCaptchaImage] = useState('');

//   const [popupMessage, setPopupMessage] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   function refreshCaptcha() {
//     const newCaptcha = generateCaptchaText(6);

//     setCaptchaText(newCaptcha);
//     setCaptchaAnswer('');
//     setCaptchaImage(createCaptchaSvg(newCaptcha));
//   }

//   useEffect(() => {
//     refreshCaptcha();
//   }, []);

//   useEffect(() => {
//     if (!popupMessage) return;

//     const timer = window.setTimeout(() => {
//       setPopupMessage(null);
//     }, 3200);

//     return () => window.clearTimeout(timer);
//   }, [popupMessage]);

//   async function handleSubmit(
//     event: React.FormEvent<HTMLFormElement>,
//   ) {
//     event.preventDefault();

//     const trimmedName = fullName.trim();
//     const trimmedEmail = email.trim();
//     const trimmedPhone = phone.trim();
//     const trimmedService = service.trim();
//     const trimmedMessage = message.trim();
//     const trimmedCaptchaAnswer = captchaAnswer.trim();

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

//     if (!trimmedCaptchaAnswer) {
//       setPopupMessage('Please enter the CAPTCHA text.');
//       return;
//     }

//     if (
//       trimmedCaptchaAnswer.toLowerCase() !==
//       captchaText.toLowerCase()
//     ) {
//       setPopupMessage('Incorrect CAPTCHA. Please try again.');
//       refreshCaptcha();
//       return;
//     }

//     setIsSubmitting(true);
//     setPopupMessage(null);

//     try {
//       /*
//        * IMPORTANT:
//        *
//        * This is currently the backend test token that you confirmed
//        * is accepted by POST /api/v1/website/contacts.
//        *
//        * Once the backend CAPTCHA API is provided, this value will be
//        * replaced with the real server-generated captchaToken.
//        */
//       await submitWebsiteContact({
//         fullName: trimmedName,
//         email: trimmedEmail,
//         phone: trimmedPhone,
//         service: trimmedService,
//         message: trimmedMessage,
//         captchaToken: TEST_CAPTCHA_TOKEN,
//       });

//       setPopupMessage(
//         'Thank you! Your message has been received.',
//       );

//       setFullName('');
//       setEmail('');
//       setPhone('');
//       setService('');
//       setMessage('');
//       setCaptchaAnswer('');

//       refreshCaptcha();
//     } catch (error) {
//       setPopupMessage(
//         error instanceof Error
//           ? error.message
//           : 'Failed to send your message.',
//       );

//       refreshCaptcha();
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <section
//       className="contact-section"
//       id="contact-section"
//     >
//       <div className="contact-container">
//         {/* =====================================================
//             LEFT SIDE - MAP
//         ====================================================== */}
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
//             <span
//               className="map-dot dot-1"
//               aria-hidden="true"
//             />

//             <span className="map-label label-1">
//               India
//             </span>

//             {/* DUBAI */}
//             <span
//               className="map-dot dot-2"
//               aria-hidden="true"
//             />

//             <span className="map-label label-2">
//               Dubai
//             </span>

//             {/* SINGAPORE */}
//             <span
//               className="map-dot dot-3"
//               aria-hidden="true"
//             />

//             <span className="map-label label-3">
//               Singapore
//             </span>
//           </div>
//         </div>

//         {/* =====================================================
//             RIGHT SIDE - CONTACT FORM
//         ====================================================== */}
//         <div className="contact-form-area">
//           {/* SUCCESS / ERROR POPUP */}
//           {popupMessage ? (
//             <div
//               className="contact-popup"
//               role="status"
//               aria-live="polite"
//             >
//               <span
//                 className="contact-popup-dot"
//                 aria-hidden="true"
//               />

//               <p>{popupMessage}</p>

//               <button
//                 type="button"
//                 onClick={() => setPopupMessage(null)}
//                 aria-label="Close message"
//               >
//                 ×
//               </button>
//             </div>
//           ) : null}

//           {/* BADGE */}
//           <div className="contact-badge">
//             ⬢ GET IN TOUCH
//           </div>

//           {/* FORM */}
//           <form
//             className="contact-form"
//             onSubmit={handleSubmit}
//           >
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
//                   event.currentTarget.value =
//                     event.currentTarget.value.replace(
//                       /[^A-Za-z\s]/g,
//                       '',
//                     );
//                 }}
//                 onChange={(event) =>
//                   setFullName(event.target.value)
//                 }
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
//                 onChange={(event) =>
//                   setEmail(event.target.value)
//                 }
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
//                   event.currentTarget.value =
//                     event.currentTarget.value.replace(
//                       /[^0-9]/g,
//                       '',
//                     );
//                 }}
//                 onChange={(event) =>
//                   setPhone(event.target.value)
//                 }
//               />

//               {/* SERVICE */}
//               <select
//                 name="service"
//                 required
//                 value={service}
//                 onChange={(event) =>
//                   setService(event.target.value)
//                 }
//               >
//                 <option value="" disabled>
//                   Select a Service *
//                 </option>

//                 {SERVICE_OPTIONS.map((option) => (
//                   <option
//                     key={option}
//                     value={option}
//                   >
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* MESSAGE */}
//             <textarea
//               name="message"
//               rows={6}
//               placeholder="Your Message *"
//               required
//               value={message}
//               onChange={(event) =>
//                 setMessage(event.target.value)
//               }
//             />

//             {/* =================================================
//                 CLASSIC IMAGE CAPTCHA
//             ================================================== */}
//             <div className="contact-captcha">
//               <label
//                 htmlFor="captchaAnswer"
//                 className="captcha-label"
//               >
//                 CAPTCHA *
//               </label>

//               <div className="captcha-box">
//                 {captchaImage ? (
//                   <img
//                     src={captchaImage}
//                     alt="CAPTCHA verification"
//                     className="captcha-image"
//                   />
//                 ) : (
//                   <div className="captcha-loading">
//                     Loading CAPTCHA...
//                   </div>
//                 )}

//                 <button
//                   type="button"
//                   className="captcha-refresh"
//                   onClick={refreshCaptcha}
//                   aria-label="Refresh CAPTCHA"
//                   title="Refresh CAPTCHA"
//                 >
//                   <RefreshCw size={18} />
//                 </button>
//               </div>

//               <input
//                 id="captchaAnswer"
//                 type="text"
//                 name="captchaAnswer"
//                 placeholder="Enter CAPTCHA text *"
//                 value={captchaAnswer}
//                 required
//                 autoComplete="off"
//                 onChange={(event) =>
//                   setCaptchaAnswer(event.target.value)
//                 }
//               />

//               <small className="captcha-help">
//                 Enter the characters shown in the image.
//               </small>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <button
//               type="submit"
//               className="contact-btn"
//               disabled={isSubmitting}
//             >
//               <span>
//                 {isSubmitting
//                   ? 'Sending...'
//                   : 'Submit'}
//               </span>

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
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { submitWebsiteContact } from '@/services/contacts.service';

const SERVICE_OPTIONS = [
  'Business Strategy',
  'Customer Experience',
  'CIO Events & Conferences',
  'Brand Recognition',
  'Video Content',
];

const TEST_CAPTCHA_TOKEN = '1_1_00000000000000000000000000000000000000000';

function generateCaptchaText(length = 6) {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

  let result = '';

  for (let index = 0; index < length; index += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

function createCaptchaSvg(text: string) {
  const width = 220;
  const height = 70;

  const backgroundLines = Array.from({ length: 7 }, () => {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = Math.random() * width;
    const y2 = Math.random() * height;

    return `
      <line
        x1="${x1}"
        y1="${y1}"
        x2="${x2}"
        y2="${y2}"
        stroke="#777"
        stroke-width="1.5"
        opacity="0.55"
      />
    `;
  }).join('');

  const dots = Array.from({ length: 35 }, () => {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const radius = Math.random() * 1.8 + 0.5;

    return `
      <circle
        cx="${cx}"
        cy="${cy}"
        r="${radius}"
        fill="#555"
        opacity="0.55"
      />
    `;
  }).join('');

  const characters = text
    .split('')
    .map((character, index) => {
      const x = 28 + index * 30;
      const y = 45 + (Math.random() * 10 - 5);
      const rotation = Math.random() * 30 - 15;

      return `
        <text
          x="${x}"
          y="${y}"
          font-family="Arial, sans-serif"
          font-size="30"
          font-weight="700"
          fill="#222"
          transform="rotate(${rotation} ${x} ${y})"
        >
          ${character}
        </text>
      `;
    })
    .join('');

  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
    >
      <rect
        width="${width}"
        height="${height}"
        fill="#f4f4f4"
      />

      ${backgroundLines}
      ${dots}
      ${characters}
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export default function ContactSection() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  const [captchaText, setCaptchaText] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');

  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function refreshCaptcha() {
    const newCaptcha = generateCaptchaText(6);

    setCaptchaText(newCaptcha);
    setCaptchaAnswer('');
    setCaptchaImage(createCaptchaSvg(newCaptcha));
  }

  useEffect(() => {
    refreshCaptcha();
  }, []);

  useEffect(() => {
    if (!popupMessage) return;

    const timer = window.setTimeout(() => {
      setPopupMessage(null);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [popupMessage]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedService = service.trim();
    const trimmedMessage = message.trim();
    const trimmedCaptchaAnswer = captchaAnswer.trim();

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

    if (!trimmedCaptchaAnswer) {
      setPopupMessage('Please enter the CAPTCHA text.');
      return;
    }

    if (trimmedCaptchaAnswer.toLowerCase() !== captchaText.toLowerCase()) {
      setPopupMessage('Incorrect CAPTCHA. Please try again.');
      refreshCaptcha();
      return;
    }

    setIsSubmitting(true);
    setPopupMessage(null);

    try {
      await submitWebsiteContact({
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        service: trimmedService,
        message: trimmedMessage,
        captchaToken: TEST_CAPTCHA_TOKEN,
      });

      setPopupMessage('Thank you! Your message has been received.');

      setFullName('');
      setEmail('');
      setPhone('');
      setService('');
      setMessage('');
      setCaptchaAnswer('');

      refreshCaptcha();
    } catch (error) {
      setPopupMessage(error instanceof Error ? error.message : 'Failed to send your message.');

      refreshCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact-section" id="contact-section">
      <div className="contact-container">
        {/* =====================================================
            LEFT SIDE - MAP
        ====================================================== */}
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

        {/* =====================================================
            RIGHT SIDE - CONTACT FORM
        ====================================================== */}
        <div className="contact-form-area">
          {/* SUCCESS / ERROR POPUP */}
          {popupMessage ? (
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
          ) : null}

          {/* BADGE */}
          <div className="contact-badge">⬢ GET IN TOUCH</div>

          {/* FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
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

            {/* MESSAGE */}
            <textarea
              name="message"
              rows={6}
              placeholder="Your Message *"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            {/* =================================================
                CLASSIC IMAGE CAPTCHA
            ================================================== */}
            <div className="contact-captcha">
              {/* CAPTCHA TITLE */}
              <label htmlFor="captchaAnswer" className="captcha-title">
                CAPTCHA *
              </label>

              {/* CAPTCHA IMAGE + REFRESH */}
              <div className="captcha-box">
                {captchaImage ? (
                  <img src={captchaImage} alt="CAPTCHA verification" className="captcha-image" />
                ) : (
                  <div className="captcha-loading">Loading CAPTCHA...</div>
                )}

                <button
                  type="button"
                  className="captcha-refresh"
                  onClick={refreshCaptcha}
                  aria-label="Refresh CAPTCHA"
                  title="Refresh CAPTCHA"
                >
                  <RefreshCw size={18} />
                </button>
              </div>

              {/* CAPTCHA INPUT */}
              <input
                id="captchaAnswer"
                type="text"
                name="captchaAnswer"
                className="contact-captcha-input"
                placeholder="Enter CAPTCHA text *"
                value={captchaAnswer}
                required
                autoComplete="off"
                onChange={(event) => setCaptchaAnswer(event.target.value)}
              />

              {/* CAPTCHA HELP TEXT */}
              <small className="captcha-help">Enter the characters shown in the image.</small>
            </div>

            {/* SUBMIT BUTTON */}
            <button type="submit" className="contact-btn" disabled={isSubmitting}>
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
