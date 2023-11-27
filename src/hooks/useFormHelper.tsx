"use client";

import { UploadFile } from "antd";
import { useEffect, useState } from "react";

export default function useFormHelper() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
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
      removeErrorOnChange("type")();
    }
  }, [type]);

  useEffect(() => {
    if (fileList[0]) {
      removeErrorOnChange("image")();
    }
  }, [fileList[0]]);

  return {
    loading,
    setLoading,
    type,
    setType,
    errors,
    setErrors,
    removeErrorOnChange,
    fileList,
    setFileList,
  };
}
