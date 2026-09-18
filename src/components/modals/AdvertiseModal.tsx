'use client';

import React, { useState } from 'react';
import { X, Check, Megaphone, Calculator, Phone, Building, User, Mail } from 'lucide-react';
import { AD_PACKAGES, AdPackage } from '@/data/pricing';

interface AdvertiseModalProps {
  isOpen: boolean;
  selectedPackage?: AdPackage;
  onClose: () => void;
}

export const AdvertiseModal: React.FC<AdvertiseModalProps> = ({
  isOpen,
  selectedPackage,
  onClose,
}) => {
  const [pkgId, setPkgId] = useState<string>(selectedPackage ? selectedPackage.id : AD_PACKAGES[0].id);
  const [days, setDays] = useState<number>(3);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentPkg = AD_PACKAGES.find((p) => p.id === pkgId) || AD_PACKAGES[0];
  const totalAmount = currentPkg.ratePerDay * days;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#b91c1c] p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Megaphone size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">
                Support Our Mission &amp; Advertise
              </h3>
              <p className="text-[10px] text-rose-100">Direct School &amp; College Reach</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-rose-200 hover:text-white hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="p-5 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <Check size={32} />
              </div>
              <h4 className="text-lg font-black text-slate-900">Inquiry Received!</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xs">
                Our Sports Media Blue Zone advertising coordinator will contact you within 2 hours with creative specifications.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Package */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1.5">
                  Select Sponsorship / Ad Package
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {AD_PACKAGES.map((pkg) => (
                    <button
                      type="button"
                      key={pkg.id}
                      onClick={() => setPkgId(pkg.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        pkgId === pkg.id
                          ? 'border-[#b91c1c] bg-rose-50/70 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="block text-[11px] font-black text-slate-900 truncate">
                        {pkg.name}
                      </span>
                      <span className="block text-xs font-black text-[#b91c1c]">
                        {pkg.priceDisplay} <span className="text-[9px] text-slate-500 font-normal">/ day</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Details & Calculator */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">Duration (Days):</span>
                  <div className="flex items-center gap-2">
                    {[1, 3, 7, 15, 30].map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setDays(d)}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-md ${
                          days === d
                            ? 'bg-[#0d2240] text-white'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Calculator size={14} className="text-[#b91c1c]" />
                    <span>Estimated Total:</span>
                  </div>
                  <span className="text-base font-black text-[#b91c1c]">
                    ₹ {totalAmount.toLocaleString('en-IN')}/-
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Company / Brand Name
                  </label>
                  <div className="relative">
                    <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Decathlon / State Sports Council"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b91c1c] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Contact Person
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b91c1c] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b91c1c] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer mt-2"
              >
                SUBMIT SPONSORSHIP INQUIRY
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
