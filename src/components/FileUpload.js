import React, { useRef, useState } from "react";

export const FileUpload = (props) => {
  const { name, value, onChange, setFieldValue } = props;
  const inputRef = useRef();
  const [filename, setFilename] = useState("");
  const fileDropHandler = (e) => {
    e.preventDefault();
    inputRef.current.files = e.dataTransfer.files;
    setFilename(e.dataTransfer.files[0].name);
  };
  const fileUpload = () => {
    inputRef.current.click();
  };
  const fileChangeHandler = (e) => {
    setFilename(e.target.files[0]?.name);
    onChange(e.target.files[0]);
  };
  const removeFile = (e) => {
    setFieldValue("image", "", false);
    setFilename("");
    e.stopPropagation();
  };

  return (
    <div className="text-start p-3">
      <div
        className="drop-zone mb-4"
        onDrop={fileDropHandler}
        onDragOver={(e) => e.preventDefault()}
        onClick={fileUpload}
      >
        <span>Drag and drop image here or click to upload</span>
        {filename && (
          <span>
            {filename}
            <CloseIcon onClick={removeFile} />
          </span>
        )}
        <input
          type="file"
          name={name}
          value={undefined}
          ref={inputRef}
          accept=".png,image/png,jpeg,image/jpeg"
          onChange={fileChangeHandler}
        />
      </div>
    </div>
  );
};
const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="#06c"
    className="bi bi-x-circle-fill"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
  </svg>
);
