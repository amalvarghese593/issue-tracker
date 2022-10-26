import React, { forwardRef, useRef } from "react";
import { Popover } from "@headlessui/react";
import { useForwardRef } from "../hooks/useForwardRef";

export const PopoverCustom = ({ label, component: Component, children }) => {
  const panelRef = useRef();
  const btnRef = useRef();
  return (
    <Popover className="relative" style={{ display: "inline-block" }}>
      <Popover.Button as={PopoverButton} customBtn={Component} ref={btnRef}>
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
