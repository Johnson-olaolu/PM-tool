import React, { ChangeEvent, useRef } from "react";
import styled from "styled-components";
import { FaFileImage } from "react-icons/fa";
import { FiX} from "react-icons/fi";
import { cloudinaryService } from "../../../services/cloudinary.service";

interface ICUstomFormFileUpload {
  name: string;
  title: string;
  text: string;
  handleSelectImage : (name: string, url: File)  => void
  handleDeleteImage : (name: string, url: string)  => void
  handleBlur: (e: ChangeEvent<HTMLDivElement>) => void;
  value : string[]
  errMsg?: string | null;
  required : boolean
}

const MCustomFileUpload = styled.div`
  width: 100%;
  input {
    display: none;
  }
  span.error {
    display : block;
  color : #E94444 ;
  font-size : 12px;
}
span.required {
    display : block;
  color : #B4CBD5;
  font-size : 12px;
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
    margin-top: 2px;
    display : grid;
    grid-template-columns : 1fr 1fr 1fr 1fr 1fr;
    gap : 8px;
    div.image {
      position: relative;
      img {
        height : 100px;
        width : 100%;
      }
      .image-close-icon {
        position : absolute;
        color : white;
        top  : 4px;
        right : 4px;
        cursor : pointer;
      }
    }
  }
`;

const CustomFormFileUpload: React.FC<ICUstomFormFileUpload> = (props) => {
  const { name, text, title , value , handleSelectImage , handleDeleteImage, handleBlur: onBlur ,errMsg , required} = props;

  const handleFileUpload = () => {
    uploadRef.current?.click();
  };

  const handleChange =  (e: ChangeEvent<HTMLInputElement>) => {
    handleSelectImage(name,e.target.files![0] )
  };

  const handleRemove = async (url : string) => {
    handleDeleteImage(name, url)
  }

  const uploadRef = useRef<HTMLInputElement>(null);
  return (
    <MCustomFileUpload >
      <input ref={uploadRef} type="file" onChange={handleChange} accept="image/*" multiple />
      <div className="upload-section" tabIndex={0} id={name} onClick={handleFileUpload} onBlur ={onBlur}>
        <FaFileImage color="#0361f0" style={{flexShrink : 0}} />
        <div className="">
          <p className="header">{title}</p>
          <p className="text">{text}</p>
        </div>
      </div>
      {errMsg ? <span className="error">{errMsg}</span> : required ? <span className="required">Required </span> : null}
      <div className="uploaded-section">
        {value.map( (val , idx)=> (
          <div className="image" key={idx}>
             <img src={val} alt="" />
             <FiX className="image-close-icon" onClick={ () => handleRemove(val)}/>
          </div>  
        ))}
      </div>
    </MCustomFileUpload>
  );
};

export default CustomFormFileUpload;
