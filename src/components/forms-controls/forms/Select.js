import React from "react";
import styled from "styled-components";
import { sharedStyle, StyledInputContainer, ArrowIcon } from "./shared-input";

const StyledSelected = styled.select`
  ${sharedStyle}
`;
const Select = ({
  options = [],
  value,
  onChange,
  onBlur,
  error,
  label: placeholder,
  icon,
  borderd,
  outlined,
  filled,
  name,
  customClass,
  getLabel,
  getValue,
  height,
}) => {
  return (
    <StyledInputContainer>
      <StyledSelected
        className={`select-control ${customClass} ${value && "has-value"}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        icon={icon}
        height={height}
        borderd={borderd || undefined}
        filled={filled || undefined}
        outlined={outlined || undefined}
      >
        <option value={""}>- - select - -</option>
        {options.map((opt, idx) => (
          <option
            key={idx}
            value={
              typeof opt === "string" || typeof opt === "number"
                ? opt
                : getValue(opt)
            }
          >
            {typeof opt === "string" || typeof opt === "number"
              ? opt
              : getLabel(opt)}
          </option>
        ))}
      </StyledSelected>
      {placeholder && <label>{placeholder}</label>}
      {error && (
        <div className="validation-message-container">
          <p className="text-danger validation-message">{error}</p>
        </div>
      )}
      {icon && icon}
      <ArrowIcon />
    </StyledInputContainer>
  );
};
export default Select;
