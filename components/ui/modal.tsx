"use client";
import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const createWrapperAndAppendToBody = (wrapperId: string) => {
  if (!document) return null;
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

interface ModalProps {
  children: React.ReactNode;
  wrapperId: string;
  onClose: () => void;
}

export default function Modal({ children, wrapperId, onClose }: ModalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

  useLayoutEffect(() => {
    let wrapperElement = document.getElementById(wrapperId);
    if (!wrapperElement)
      wrapperElement = createWrapperAndAppendToBody(wrapperId);
    setWrapperElement(wrapperElement!);

    return () => {
      wrapperElement?.parentNode?.removeChild(wrapperElement);
    };
  }, [wrapperId]);

  if (!wrapperElement) return null;

  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed left-0 top-0 w-screen h-screen bg-black opacity-90 z-50"
      />
      <div className="fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-[1000] rounded-lg bg-black border border-zinc-800">
        {children}
      </div>
    </>,
    wrapperElement
  );
}
