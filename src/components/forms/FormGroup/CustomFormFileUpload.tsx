import React, { ChangeEvent, useRef } from "react";
import styled from "styled-components";
import { FaFileImage } from "react-icons/fa";
import { cloudinaryService } from "../../../services/cloudinary.service";

interface ICUstomFormFileUpload {
  name: string;
  title: string;
  text: string;
}

const MCustomFileUpload = styled.div`
  width: 100%;
  input {
    display: none;
  }
  .upload-section {
    cursor: pointer;
    padding: 16px;
    width: 100%;
    background: white;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    border: 0.6px solid rgba(3, 97, 240, 0.12);
    border-radius: 2px;
    &:focus {
      border: 2px solid #0361f0;
    }
    div {
      p.header {
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: #1a0c2f;
        margin-bottom: 8px;
      }
      p.text {
        font-weight: 300;
        font-size: 12px;
        line-height: 14px;
        color: #1a0c2f;
      }
    }
  }
  .uploaded-section {
  }
`;

const CustomFormFileUpload: React.FC<ICUstomFormFileUpload> = (props) => {
  const { name, text, title } = props;

  const handleFileUpload = () => {
    uploadRef.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const data = await cloudinaryService.uploadToCloudinary({
      image: e.target.files![0],
      upload_preset: "pm_tool",
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME!,
    });
    console.log(data);
  };

  const uploadRef = useRef<HTMLInputElement>(null);
  return (
    <MCustomFileUpload tabIndex={0} id={name} onClick={handleFileUpload}>
      <input ref={uploadRef} type="file" onChange={handleChange} accept="image/*" multiple />
      <div className="upload-section">
        <FaFileImage color="#0361f0" />
        <div className="">
          <p className="header">{title}</p>
          <p className="text">{text}</p>
        </div>
      </div>
      <div className="uploaded-section"></div>
    </MCustomFileUpload>
  );
};

export default CustomFormFileUpload;
