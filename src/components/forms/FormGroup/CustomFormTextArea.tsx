import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface ICustomFormTextArea{
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  errMsg?: string | null;
  required: boolean;
}

const MCustomFormInput = styled.div`
    width : 100%;
    textarea {
    height : 160px;
    resize : none;
    width : 100%;
    padding : 16px;
    font-size : 14px;
    color : #1A0C2F;
    background: #FFFFFF;
    border: 0.6px solid rgba(3, 97, 240, 0.12);
    border-radius: 4px;
    &::placeholder {
        color: #B4CBD5;
    }
    &:focus {
        border : 2px solid #0361F0;
    }
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
`;

const CustomFormTextArea: React.FC<ICustomFormTextArea> = (props) => {
  const { name, onBlur, onChange, placeholder, value, errMsg, required } = props;

  return (
    <MCustomFormInput>
      <textarea  placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} name={name} />
      {errMsg ? <span className="error">{errMsg}</span> : required ? <span className="required">Required </span> : null}
    </MCustomFormInput>
  );
};

export default CustomFormTextArea;
