"use client";

import React from 'react';
import Button from './Button';

export default function WhatsAppButton({ phone, message = '', label = 'WhatsApp', className }: { phone: string; message?: string; label?: string; className?: string }) {
  const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  return (
    <Button as="a" href={url} target="_blank" rel="noopener noreferrer" variant="secondary" className={className}>
      {label}
    </Button>
  );
}
