import React, { forwardRef, useEffect, useRef } from "react";
import { Popover } from "@headlessui/react";

const useForwardRef = (ref) => {
  const innerRef = useRef(null);
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
      // innerRef.current = ref.current;
    }
  }, []);
  return innerRef;
};

export const PopoverCustom = ({ label, components: Components, children }) => {
  const panelRef = useRef();
  const btnRef = useRef();
  return (
    <>
      <Popover className="relative" style={{ display: "inline-block" }}>
        <Popover.Button
          as={PopoverButton}
          customBtn={Components?.BtnControl}
          ref={btnRef}
        >
          {label}
        </Popover.Button>
        <Popover.Panel
          as={PopoverPanel}
          className="absolute z-100 popover-pnl"
          ref={panelRef}
        >
          {children}
        </Popover.Panel>
      </Popover>
    </>
  );
};

const PopoverButton = forwardRef(
  ({ customBtn: CustomBtn, children, ...rest }, ref) => {
    const safeRef = useForwardRef(ref);
    const mouseEnterBtn = (e) => e.target.click();
    const mouseLeaveBtn = (e) => {
      const isEnterPanel = safeRef.current?.nextSibling?.contains(
        document.elementFromPoint(e.clientX, e.clientY)
      );
      if (isEnterPanel === false) e.target.click();
    };
    return CustomBtn ? (
      <CustomBtn
        {...rest}
        onMouseEnter={mouseEnterBtn}
        onMouseLeave={mouseLeaveBtn}
        ref={safeRef}
        label={children}
      />
    ) : (
      <button
        ref={safeRef}
        {...rest}
        onMouseEnter={mouseEnterBtn}
        onMouseLeave={mouseLeaveBtn}
        style={{ border: "none", outline: "none", padding: "10px" }}
      >
        {children}
      </button>
    );
  }
);

const PopoverPanel = forwardRef((props, ref) => {
  const safeRef = useForwardRef(ref);
  const mouseLeavePanel = (e) => {
    const isEnterBtn = safeRef.current?.previousSibling?.contains(
      document.elementFromPoint(e.clientX, e.clientY)
    );
    if (!isEnterBtn) {
      safeRef.current?.previousSibling?.click();
    }
  };
  return (
    <div
      ref={safeRef}
      {...props}
      onMouseLeave={mouseLeavePanel}
      style={{ border: "none", outline: "none", height: "40px" }}
    >
      {props.children}
    </div>
  );
});

const PopoverImage = ({ source }) => {
  return <img className="image" src={source} alt="No image" />;
};
Popover.Image = PopoverImage;

const PopoverTitle = ({ title }) => {
  useEffect(() => {
    console.log("title rendered");
    return () => console.log("title unmounted");
  }, []);
  return title ? <span className="title">{title}</span> : undefined;
};
Popover.Title = PopoverTitle;

const PopoverDescription = ({ description }) => {
  return description ? (
    <span className="description">{description}</span>
  ) : undefined;
};
Popover.Description = PopoverDescription;
