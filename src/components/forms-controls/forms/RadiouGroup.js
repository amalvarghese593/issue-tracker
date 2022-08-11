import React, { cloneElement, Children } from "react";
const RadioGroup = ({
  name,
  children,
  onChange,
  label,
  onBlur,
  error,
  value: inputValue,
}) => {
  const renderChildren = () => {
    return Children.map(children, (child) => {
      return cloneElement(child, {
        name: name,
        onChange: onChange,
        onBlur: onBlur,
        error: error,
        inputValue,
      });
    });
  };
  return (
    <div className="radio-group mt-3">
      {label && <h5 className="mb-2">{label}</h5>}
      <div className="flex items-center ms-2 ">
        {renderChildren()}
        {error && <label className="text-danger">{error}</label>}
      </div>
    </div>
  );
};
const Item = ({ name, value, children, onChange, onBlur, inputValue }) => {
  const isSelected = inputValue === value;
  return (
    <div className="me-4">
      <input
        type="radio"
        name={name}
        value={value}
        onBlur={onBlur ? onBlur : (e) => {}}
        id={name + "" + value}
        onChange={onChange}
        checked={isSelected}
      />
      <label className="ms-2 fs-18" htmlFor={name + "" + value}>
        {children}
      </label>
    </div>
  );
};
RadioGroup.Item = Item;
export default RadioGroup;
