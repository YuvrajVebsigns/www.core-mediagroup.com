'use client';

import Image from 'next/image';
const associateBrands = [
  {
    name: 'CIO Angel Network',
    logo: '/assets/Associatedbrands/CAN.png',
  },
  {
    name: 'B2B 1K Ventures',
    logo: '/assets/Associatedbrands/b2b.png',
  },
  {
    name: 'Brand Three',
    logo: '/assets/Associatedbrands/CAN.png',
  },
  {
    name: 'Brand Four',
    logo: '/assets/Associatedbrands/b2b.png',
  },
  {
    name: 'Brand Five',
    logo: '/assets/Associatedbrands/b2b.png',
  },
  //   {
  //     name: 'Brand Six',
  //     logo: '/assets/associate-brands/brand-6.png',
  //   },
  //   {
  //     name: 'Brand Seven',
  //     logo: '/assets/associate-brands/brand-7.png',
  //   },
  //   {
  //     name: 'Brand Eight',
  //     logo: '/assets/associate-brands/brand-8.png',
  //   },
  //   {
  //     name: 'Brand Nine',
  //     logo: '/assets/associate-brands/brand-9.png',
  //   },
  //   {
  //     name: 'Brand Ten',
  //     logo: '/assets/associate-brands/brand-10.png',
  //   },
];

export default function AssociateBrandsPage() {
  return (
    <main className="associate-brands-page">
      <section className="associate-brands-hero">
        <div className="associate-brands-container">
          <div className="associate-brands-label">
            <Image
              src="/assets/icon.png"
              alt="About Us"
              width={20}
              height={20}
              className="expertise-label-icon"
            />
            Associate Brands
          </div>

          {/* <h1>
            Our Trusted <span>Associate Brands</span>
          </h1> */}

          {/* <p>
                We collaborate with strong partner brands that share our vision for innovation,
                enterprise growth, leadership, and digital excellence.
            </p> */}
        </div>
      </section>

      <section className="associate-brands-section">
        <div className="associate-brands-container">
          <div className="associate-brands-grid">
            {associateBrands.map((brand, index) => (
              <div className="associate-brand-card" key={index}>
                <div className="associate-brand-logo-box">
                  <img src={brand.logo} alt={brand.name} />
                </div>

                <h3>{brand.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
