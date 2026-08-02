"use client";

import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }: { open: boolean; title?: string; message?: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <div className="space-y-4">
        <p className="text-sm text-slate-600">{message}</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
}
