'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaClock,
} from 'react-icons/fa';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center py-6 px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600">
          <Link href="/" className="hover:text-[#0B5FA5] flex items-center gap-1">
            <FaArrowLeft size={12} />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#032D59] font-black">Contact Us</span>
        </div>
        <span className="text-xs font-black uppercase text-[#0B5FA5] tracking-widest bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
          We&apos;re Here to Help
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          GET IN TOUCH WITH SPORTS MEDIA BLUE ZONE
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2">
          Reach out to affiliate your school, enroll in journalism courses, sponsor athletes, or request tournament live streaming.
        </p>
      </div>

      {/* 2-Column Content: Left Contact Cards, Right Message Form */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
        {/* Left 5 Cols: Contact Information */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-lg font-black text-[#032D59] uppercase tracking-wide">
              HEADQUARTERS &amp; MEDIA DESK
            </h2>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-md bg-blue-50 text-[#0B5FA5] shrink-0 mt-0.5">
                <FaMapMarkerAlt size={16} />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-slate-900 block">
                  Office Address
                </span>
                <span className="text-xs text-slate-600 font-medium leading-relaxed">
                  Sports Media Blue Zone Foundation<br />
                  Plot No. 42, Road No. 3, Banjara Hills / Gachibowli Sports Hub<br />
                  Hyderabad, Telangana - 500034, India
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-md bg-emerald-50 text-[#168C45] shrink-0 mt-0.5">
                <FaPhoneAlt size={16} />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-slate-900 block">
                  Helpline Numbers
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  +91 98480 12345 &bull; +91 40 2345 6789
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-md bg-amber-50 text-amber-600 shrink-0 mt-0.5">
                <FaEnvelope size={16} />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-slate-900 block">
                  Email Desk
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  contact@sportsmedia.world &bull; info@bluezone.org
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-md bg-purple-50 text-purple-600 shrink-0 mt-0.5">
                <FaClock size={16} />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-slate-900 block">
                  Operating Hours
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  Monday &ndash; Saturday: 09:00 AM &ndash; 06:30 PM IST
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Direct Message Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-black text-[#032D59] uppercase mb-4">
            SEND US A DIRECT MESSAGE
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
              <FaCheckCircle className="text-[#168C45] mx-auto mb-2" size={36} />
              <h3 className="text-base font-black text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-700 mt-1">
                Thank you, {formData.name}. Our coordination officer will get back to you within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Coach Ramesh"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-bold"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="School Affiliation">School Affiliation / Information Centre</option>
                    <option value="Journalism School">Journalism School Admissions</option>
                    <option value="Event Hosting">Event &amp; Tournament Live Streaming</option>
                    <option value="Athlete Sponsorship">Athlete Sponsorship &amp; Support</option>
                    <option value="Media Desk">Media Desk &amp; Press Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, school details, or requirements..."
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#032D59] hover:bg-[#0B5FA5] text-white font-black text-xs uppercase tracking-wider rounded-md shadow-xs transition-all cursor-pointer"
              >
                SUBMIT MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
