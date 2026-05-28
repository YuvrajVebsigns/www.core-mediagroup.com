'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact-section">
      <div className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-map-area">
          <div className="contact-map">
            <Image
              src="/assets/map.svg"
              alt="Global Map"
              width={700}
              height={500}
              className="contact-map-img"
              priority
            />

            {/* Dots */}
            <span className="map-dot dot-1"></span>
            <span className="map-dot dot-2"></span>
            <span className="map-dot dot-3"></span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-form-area">
          {/* Badge */}
          <div className="contact-badge">⬢ GET IN TOUCH</div>

          {/* Title */}
          <h2 className="contact-title">Let’s Start a Conversation</h2>

          {/* Form */}
          <form className="contact-form">
            <div className="contact-grid">
              {/* FULL NAME */}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                required
                pattern="^[A-Za-z\s]+$"
                title="Only alphabets are allowed"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
                }}
              />

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address"
              />

              {/* PHONE NUMBER */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                required
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                }}
              />

              {/* SELECT */}
              <select required defaultValue="">
                <option value="" disabled>
                  Select a Service *
                </option>

                <option>Business Strategy</option>
                <option>Customer Experience</option>
                <option>CIO Events & Conferences</option>
                <option>Brand Recognition</option>
                <option>Video Content </option>
              </select>
            </div>

            {/* MESSAGE */}
            <textarea rows={6} placeholder="Your Message *" required />

            {/* BUTTON */}
            <button type="submit" className="contact-btn">
              <span>Send Message</span>

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
