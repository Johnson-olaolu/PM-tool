import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import { Box, Text } from "@chakra-ui/react";
const MCustomSelect = styled.div`
width: 100%;
  .custom-select {
    position: relative;
    width: 100%;
    &:focus {
      div {
        border: 2px solid #0361f0;
      }
    }
    div {
      cursor : pointer;
      border: 0.6px solid rgba(3, 97, 240, 0.12);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      background: white;
      border-radius: 4px;
      p.select-active {
        color: rgba(0, 0, 0, 0.80);
        font-size : 14px;
      }
      p.select-inactive {
        color: #b4cbd5;
        font-size : 14px;
      }
    }
    .dropdown {
      display : none;
      z-index: 5;
      background: white;
      position: absolute;
      bottom: -2px;
      transform: translateY(100%);
      left: 0;
      width: 100%;
      list-style: none;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
      span {
        display : block;
        padding: 8px 16px;
        color: #b4cbd5;
        font-size : 14px;
        &:hover {
          background : rgba(0, 0, 0, 0.05);
        }    
      }
      li {
        padding: 8px 16px;
        font-size : 14px;
        &:hover {
          background : rgba(0, 0, 0, 0.05);
        }    
      }
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

interface IMCustumFormGroupSelect {
  data: { name: string; value: any }[] ;
  onSelect: (name: string, value: any) => void;
  onBlur?: (e: React.ChangeEvent<HTMLDivElement>) => void;
  name: string;
  value: any;
  placeholder: string;
  required: boolean;
  errMsg?: string | null;
}

const CustomFormSelect: React.FC<IMCustumFormGroupSelect> = (props) => {
  const { data, required, name, onSelect, placeholder, value, errMsg, onBlur } = props;
  const dropdownRef = useRef<HTMLUListElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  console.log(data)
  const toggleDropdown = () => {
    if (dropdownRef.current?.style.display === "none") {
      dropdownRef.current.style.display = "block";
    } else {
      dropdownRef.current!.style.display = "none";
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target !== selectRef.current && selectRef.current?.contains(e.target as HTMLElement) === false) {
      dropdownRef.current!.style.display = "none";
    }
  };

  useEffect(() => {
    document.querySelector("body")?.addEventListener("click", handleOutsideClick);
    return () => {
      document.querySelector("body")?.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const onChange = (d: { name: string; value: any }) => {
    onSelect(name, d.value);
    toggleDropdown();
  };

  return (
    <MCustomSelect onBlur={onBlur} id ={name}>
      <div className="custom-select" ref={selectRef}  tabIndex={0}>
        <div className="" onClick={toggleDropdown}>
        <p className = {!!value && data ? "select-active" : "select-inactive"}>{!!value && data ? data?.find((d) => d.value === value)!?.name : placeholder}</p>
        <FiChevronDown fontSize={24} color={"#B4CBD5"} />
      </div>
      <ul ref={dropdownRef} className="dropdown">
        <span
          onClick={() => {
            onChange({ name: "", value: "" });
          }}
        >
          {placeholder}
        </span>
        {data?.map((d, idx) => (
          <li key={idx} onClick={() => onChange(d)} className="">
            {d.name}
          </li>
        ))}
      </ul>
      </div>
      {errMsg ? <span className="error">{errMsg}</span> : required ? <span className="required">Required </span> : null}
    </MCustomSelect>
  );
};

export default CustomFormSelect;
