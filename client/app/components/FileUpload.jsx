"use client";
import React from "react";
import { Upload } from "lucide-react";

const FileUpload = () => {
  return (
    <>
      <div className=" bg-slate-900 text-white shadow-2xl flex justify-center items-center">
        <Upload />
      </div>
    </>
  );
};

export default FileUpload;
