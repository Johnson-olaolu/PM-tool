import React, { ChangeEvent } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components";

interface ICustomFormInput {
  placeholder: string;
  value: string | number | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  errMsg?: string | null;
  required: boolean;
  type : string
}

const MCustomFormInput = styled.div`
    width : 100%;
  input {
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

const CustomFormInput: React.FC<ICustomFormInput> = (props) => {
  const { name, onBlur, onChange, placeholder, value, errMsg, required , type} = props;

  return (
    <MCustomFormInput>
      {type === "2" ? (
        <NumberFormat placeholder={placeholder} value={value}  onChange={onChange} onBlur={onBlur} name={name} thousandSeparator={true} prefix={'₦'} />
      ) : (
        <input type={type} placeholder={placeholder} value={value!} onChange={onChange} onBlur={onBlur} name={name} />
      )}
      
      {errMsg ? <span className="error">{errMsg}</span> : required ? <span className="required">Required </span> : null}
    </MCustomFormInput>
  );
};

export default CustomFormInput;
