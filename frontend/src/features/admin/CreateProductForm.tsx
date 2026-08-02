"use client";

import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import FormField from '../../components/admin/FormField';
import Input from '../../components/ui/Input';
import apiClient from '../../lib/apiClient';
import { useRouter } from 'next/navigation';

export default function CreateProductForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post('/api/v1/products', { title, price: Number(price) });
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create product</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Create product">
        <form onSubmit={submit}>
          <FormField label="Title"><Input value={title} onChange={(e) => setTitle(e.target.value)} /></FormField>
          <FormField label="Price"><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></FormField>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
