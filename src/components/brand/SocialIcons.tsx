import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6';

export const FacebookIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 14,
  className = '',
}) => <FaFacebookF size={size} className={className} />;

export const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 14,
  className = '',
}) => <FaInstagram size={size} className={className} />;

export const YoutubeIcon: React.FC<{ size?: number; className?: string; fill?: string }> = ({
  size = 14,
  className = '',
}) => <FaYoutube size={size} className={className} />;

export const TwitterIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 14,
  className = '',
}) => <FaXTwitter size={size} className={className} />;

export const LinkedInIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 14,
  className = '',
}) => <FaLinkedinIn size={size} className={className} />;
