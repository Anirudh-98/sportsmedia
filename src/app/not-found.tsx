import React from 'react';
import { NotFoundView } from '@/components/common/NotFoundView';

export default function NotFound() {
  return (
    <NotFoundView
      title="Page Not Found"
      message="The requested route does not exist, has been relocated, or is restricted under zero-trust role-based security."
    />
  );
}
