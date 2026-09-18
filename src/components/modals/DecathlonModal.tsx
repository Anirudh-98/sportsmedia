'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Tag, ShoppingBag, ExternalLink, Check } from 'lucide-react';

interface DecathlonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DecathlonModal: React.FC<DecathlonModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyPromo = () => {
    navigator.clipboard.writeText('BLUEZONE15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0082c3] p-4 text-white flex items-center justify-between">
          <div>
            <span className="font-black text-lg tracking-wider block">DECATHLON</span>
            <span className="text-[10px] uppercase font-bold text-blue-100">Official Sports Partner</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-blue-100 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
            <Image
              src="/images/decathlon_ad.jpg"
              alt="Decathlon gear"
              fill
              className="object-contain p-2"
            />
          </div>

          <div className="text-center">
            <h4 className="text-base font-black text-[#0d2240]">
              Special School &amp; Grassroots Athlete Discount
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Get an exclusive 15% off on all Kipsta footballs, Tarmak basketballs, Artengo tennis rackets, and Kalenji running shoes.
            </p>
          </div>

          <div className="bg-blue-50 border-2 border-dashed border-[#0082c3] p-3 rounded-xl flex items-center justify-between">
            <div>
              <span className="block text-[10px] text-slate-500 font-bold uppercase">Promo Code</span>
              <span className="font-black text-base text-[#0082c3] tracking-wider">BLUEZONE15</span>
            </div>
            <button
              onClick={copyPromo}
              className="px-3 py-1.5 bg-[#0082c3] hover:bg-[#006ca2] text-white rounded text-xs font-black uppercase flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copied ? <Check size={14} /> : <Tag size={14} />}
              {copied ? 'COPIED!' : 'COPY CODE'}
            </button>
          </div>

          <a
            href="https://www.decathlon.in"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 bg-[#0d2240] hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ShoppingBag size={15} />
            <span>VISIT DECATHLON ONLINE STORE</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};
