import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";

const MCustomDatePicker = styled.div`
  width: 100%;
  .custom-datepicker {
    &:focus {
      div {
        border: 2px solid #0361f0;
      }
    }
    cursor: pointer;
    border: 0.6px solid rgba(3, 97, 240, 0.12);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: white;
    border-radius: 4px;
    p.date-active {
      color: rgba(0, 0, 0, 0.8);
      font-size: 14px;
    }
    p.date-inactive {
      color: #b4cbd5;
      font-size: 14px;
    }
  }
  span.error {
    display: block;
    color: #e94444;
    font-size: 12px;
  }
  span.required {
    display: block;
    color: #b4cbd5;
    font-size: 12px;
  }
`;

interface ICustomFormDatePicker {
  onSelect: (name: string, value: any) => void;
  onBlur?: (e: React.ChangeEvent<HTMLDivElement>) => void;
  name: string;
  value: any;
  placeholder: string;
  required: boolean;
  errMsg?: string | null;
}
const CustomFormDatePicker: React.FC<ICustomFormDatePicker> = (props) => {
  const { name, onSelect, placeholder, required, value, errMsg, onBlur } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (date: Date) => {
    onSelect(name, date);
    setIsOpen(false);
  };
  return (
    <MCustomDatePicker>
      <div className="custom-datepicker" onClick={() => setIsOpen(true)}  tabIndex={0} onBlur={onBlur} id={name}>
        <p className={!!value ? "date-active" : "date-inactive"}>
          {!!value ? moment(value).format("DD/MM/YYYY") : placeholder}
        </p>
        <FaCalendar color="#0361F0"/>
      </div>
      {isOpen && <DatePicker selected={value} onChange={handleChange} onClickOutside={() => setIsOpen(false)} inline />}
      {errMsg ? <span className="error">{errMsg}</span> : required ? <span className="required">Required </span> : null}
    </MCustomDatePicker>
  );
};

export default CustomFormDatePicker;
