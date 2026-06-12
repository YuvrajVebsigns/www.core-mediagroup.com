'use client';

import Image from 'next/image';

export default function KeyClient() {
  const logos = [
    '/assets/keyclients/client1.png',
    '/assets/keyclients/client2.png',
    '/assets/keyclients/client3.png',
    '/assets/keyclients/client4.png',
    '/assets/keyclients/client5.png',
    '/assets/keyclients/client6.png',
    '/assets/keyclients/client7.png',
    '/assets/keyclients/client8.png',
    '/assets/keyclients/client9.png',
  ];

  return (
    <section className="clients-section">
      <div className="clients-container">
        {/* Heading */}

        <div className="clients-heading">
          <div className="clients-label">
            <Image
              src="/assets/icon.png"
              alt="Key Clients"
              width={20}
              height={20}
              className="expertise-label-icon"
            />
            <span className="clients-label-text">CLIENT SHOWCASE</span>
          </div>

          <h2 className="clients-title">
            Trusted by <span>Key Clients</span> Across Industries
          </h2>

          {/* <h2 className="clients-title">
            Trusted By Industry
            <br />
            <span>Leading Brands</span>
          </h2> */}
        </div>

        {/* Slider */}

        <div className="clients-slider">
          <div className="clients-track">
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="client-card">
                <Image
                  src={logo}
                  alt="Client Logo"
                  width={210}
                  height={120}
                  className="client-logo"
                />
              </div>
            ))}
          </div>

          {/* Gradients */}

          <div className="clients-gradient-left" />

          <div className="clients-gradient-right" />
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import Image from 'next/image';

// export default function KeyClient() {
//   const logos = [
//     '/assets/keyclients/client1.png',
//     '/assets/keyclients/client2.png',
//     '/assets/keyclients/client3.png',
//     '/assets/keyclients/client4.png',
//     '/assets/keyclients/client5.png',
//     '/assets/keyclients/client6.png',
//     '/assets/keyclients/client7.png',
//     '/assets/keyclients/client8.png',
//     '/assets/keyclients/client9.png',
//   ];

//   return (
//     // <section className="clients-section">
//       <div className="clients-container">
//         <div className="clients-slider">
//           <div className="clients-heading">
//             <h2 className="clients-title">Key Clients</h2>
//           </div>

//           <div className="clients-track">
//             {[...logos, ...logos].map((logo, index) => (
//               <div key={index} className="client-card">
//                 <Image
//                   src={logo}
//                   alt="Client Logo"
//                   width={180}
//                   height={80}
//                   className="client-logo"
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="clients-gradient-left" />
//           <div className="clients-gradient-right" />
//         </div>
//       </div>
//     // </section>
//   );
// }
