import Image from "next/image";
import { useEffect, useState } from "react";

type ModalProps = {
  children: React.ReactNode;
  isDisplayed: boolean;
  onClose: () => void;
};
const Modal: React.FC<ModalProps> = ({ children, isDisplayed, onClose }) => {
  return isDisplayed ? (
    <div className="fixed p-4 left-0 top-0 w-full min-h-screen bg-blackBerry-900 z-50 flex flex-col justify-center items-center">
      <div className="max-w-lg bg-blackBerry p-8 rounded-3xl border overflow-auto max-h-screen">
        <div className="flex justify-end w-full mb-4">
          <Image
            src="/icons/cross-white.svg"
            alt="close"
            width={20}
            height={20}
            onClick={onClose}
            className="cursor-pointer hover:opacity-70 duration-200"
          />
        </div>
        <div>
          <div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
