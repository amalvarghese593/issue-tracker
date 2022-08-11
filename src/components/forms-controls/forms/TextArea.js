import React from "react";
import { StyledInputContainer, Hint, Error } from "./shared-input";
const TextArea = React.forwardRef(
  (
    {
      value,
      name,
      onChange,
      label: placeholder,
      icon,
      error,
      touched,
      hint,
      onBlur,
    },
    ref
  ) => {
    React.useEffect(() => {
      const el = document.getElementById(`textarea-${placeholder}`);
      if (el && el?.style) {
        el.style.minHeight = "80px";
        if (el.scrollHeight >= 128) {
          console.log("scrollheight: ", el.clientHeight);
          el.style.height = `${el.scrollHeight}px`;
        }
      }
    }, [value, ref, placeholder]);
    return (
      <StyledInputContainer>
        <textarea
          // rows={5}
          id={`textarea-${placeholder}`}
          className="form-control"
          placeholder={placeholder}
          icon={icon}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          // filled={filled || undefined}
          // borderd={borderd || undefined}
          error={error}
        />
        {icon && icon}
        {error && touched && (
          <div style={{ textAlign: "left" }}>
            <Error>{error}</Error>
          </div>
        )}
        {hint && <Hint>Note: {hint}</Hint>}
      </StyledInputContainer>
    );
  }
);

export default TextArea;
