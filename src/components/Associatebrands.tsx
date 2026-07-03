'use client';

import Image from 'next/image';
const associateBrands = [
  {
    name: 'CIO PowerList',
    logo: '/assets/Associatedbrands/cio-powerlist1.png',
  },
  {
    name: 'CXO Capital',
    logo: '/assets/Associatedbrands/cxo-capital.png',
  },
  {
    name: 'CIO Choice',
    logo: '/assets/Associatedbrands/cio-choice23.png',
  },
  {
    name: 'CIO powerlist MEA',
    logo: '/assets/Associatedbrands/cio-powerlist-mea.png',
  },
  // {
  //   name: 'Brand Five',
  //   logo: '/assets/Associatedbrands/b2b.png',
  // },
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
              width={22}
              height={22}
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
