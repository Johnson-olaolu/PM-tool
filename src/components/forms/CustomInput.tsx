import React, { ChangeEvent } from "react";
import styled, { css } from "styled-components";

const StyledCustomInput = styled.div`
	position: relative;
	label {
		position: absolute ;
		left : 1rem;
		top : 1rem;
		font-size : 14px;
		z-index: 1;
		color : #CACACA;
		transition : all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5)
   }
	input {
		position: relative;
		height: 3rem;
		width : 100%;
		border: 1px solid rgba(151, 151, 151, 0.261662);
		box-sizing: border-box;
		border-radius: 2px;
		background: transparent;
		color: rgba(0, 0, 0, 0.87);
		transition : all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
		z-index:2;
		&::placeholder {
			opacity : 0;
			color: white;
		}
		&:focus-visible {
			outline: none;
		}
		&:focus {
			border: 1px solid #257CFF;
			border-radius: 8px;
			padding : 24px 12px 8px 12px;
			caret-color :  #257CFF;
			&::placeholder {
				opacity : 1;
				color: #CACACA;
			}
		}
		&:focus ~ label {
			transform : translate(-2px, -12px);
			color : #257CFF;
			font-size: 12px;
		}
		&:valid {
			padding : 0 12px;
		}
		&:valid ~ label{
			transform : translate(-2px, -12px);
			display: none
		}
	}

`;

interface ICustomInput {
  placeholder : string
  label : string
  value : string
  onChange : (e: string | ChangeEvent<any>) => void; 
  name : string
  type : string
}
const CustomInput : React.ForwardRefRenderFunction<HTMLInputElement, ICustomInput> = (props, ref) => {
	const {placeholder,  label, value, onChange , name, type} = props
	return (
		<StyledCustomInput>
			<input placeholder={placeholder} onChange = {onChange} value = {value} ref = {ref}  type={type} name = {name} required />
			<label>{label}</label>
		</StyledCustomInput>
	);
};

export default React.forwardRef(CustomInput);
