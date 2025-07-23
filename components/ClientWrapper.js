'use client';
import { useState } from 'react';
import AlertModal from '@/components/AlertModal';

export default function ClientWrapper({ children }) {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleClose = () => {
    setAlertVisible(false);
  };

  return (
    <>
      <AlertModal visible={alertVisible} onClose={handleClose} />
      {children}
    </>
  );
}
