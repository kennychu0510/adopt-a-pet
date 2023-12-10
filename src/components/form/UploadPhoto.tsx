"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { compressImage, getBase64 } from "@/utils/helper";

const imageCheck = (file: RcFile) => {
  // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isImage = file.type.includes("image/");
  if (!isImage) {
    message.error("You can only upload an image!");
  }

  return isImage;
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error("Image must smaller than 2MB!");
  // }
  // return isImage && isLt2M;
};

export default function UploadPhoto({
  fileList,
  setFileList,
}: {
  fileList: UploadFile<any>[];
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>;
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    );
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (imageCheck(info.file as any)) {
      setFileList(info.fileList);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        customRequest={dummyRequest}
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        maxCount={1}
        onPreview={handlePreview}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="photo" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};
