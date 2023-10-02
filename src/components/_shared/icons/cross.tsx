import React from "react";

export const Cross = (props: any) => (
  <svg
    width={23}
    height={22}
    viewBox="0 0 23 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      transform="rotate(-45 1 20.506)"
      fill="#fff"
      d="M1 20.5061H30V22.5061H1z"
    />
    <path
      transform="rotate(45 1.953 0)"
      fill="#fff"
      d="M1.95312 0H30.95312V2H1.95312z"
    />
  </svg>
);
