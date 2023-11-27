'use client';

import React, { useEffect, useState } from 'react';

export default function useFormHelper() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [errors, setErrors] = useState<Set<string>>(new Set());

  function removeErrorOnChange(key: string) {
    return () =>
      setErrors((errors) => {
        const newErrors = new Set(errors);
        newErrors.delete(key);
        return newErrors;
      });
  }

  useEffect(() => {
    if (type) {
      removeErrorOnChange('type')();
    }
  }, [type]);

  return {
    loading,
    setLoading,
    type,
    setType,
    errors,
    setErrors,
    removeErrorOnChange
  };
}
