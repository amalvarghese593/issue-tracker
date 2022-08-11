import styled from "styled-components";
import { StyledInputContainer, Hint, Error, sharedStyle } from "./shared-input";
import { forwardRef, useState } from "react";
const StyledInput = styled.input`
  ${sharedStyle}
`;

const PasswordInput = forwardRef(
  (
    {
      onPaste,
      value,
      onChange,
      label: placeholder,
      icon,
      filled,
      borderd,
      outlined,
      error,
      hint,
      onBlur,
      type,
      must,
      onKeyUp,
    },
    ref
  ) => {
    const [isVisible, setVisibility] = useState(false);
    const handlePasswordVisibility = (e) => {
      setVisibility((prev) => !prev);
      //   const inputEl = document.getElementsByClassName("input-el");
      //   for (let i = 0; i < inputEl.length; i++) {
      //     if (inputEl[i].dataset.type === "input-password") {
      //       inputEl[i].type =
      //         inputEl[i].type === "password" ? "text" : "password";
      //     }
      //   }
    };

    return (
      <StyledInputContainer>
        <StyledInput
          onKeyUp={onKeyUp}
          type={isVisible ? "text" : "password"}
          ref={ref}
          placeholder=""
          icon={icon}
          value={value}
          onChange={onChange}
          outlined={outlined || undefined}
          filled={filled || undefined}
          borderd={borderd || undefined}
          error={error}
          onBlur={onBlur}
          onPaste={onPaste}
          data-type={`input-${type}`}
          className="input-el"
        />
        {placeholder && (
          <label>
            {placeholder}
            {must && (
              <span className="required text-danger" style={{ opacity: 0 }}>
                *
              </span>
            )}
          </label>
        )}
        {icon && icon}
        <button
          type="button"
          className="password-eye"
          onClick={handlePasswordVisibility}>
          {isVisible ? (
            <i className="fal fa-eye-slash "></i>
          ) : (
            <i className="fal fa-eye"></i>
          )}
        </button>
        {error && (
          <div style={{ textAlign: "left" }}>
            {" "}
            <Error>{error}</Error>
          </div>
        )}
        {hint && <Hint>Note: {hint}</Hint>}
      </StyledInputContainer>
    );
  }
);
export default PasswordInput;
