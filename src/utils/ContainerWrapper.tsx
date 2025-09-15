

import React from "react";

type ContainerWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const ContainerWrapper: React.FC<ContainerWrapperProps> = ({ children, className = "" }) => {
  return (
    <div className={`px-4  mx-auto w-11/12 md:w-10/12 sm:px-6 ${className}`}>
      {children}
    </div>
  );
};

export default ContainerWrapper;
