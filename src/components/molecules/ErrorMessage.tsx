import React from "react";
import "../common.css";

const ErrorMessage: React.FC<{ isErrorEmpty: boolean; message: string }> = ({
  isErrorEmpty,
  message,
}) => {
  if (isErrorEmpty) return null;
  return <div className="centerAlign">{message}</div>;
};

export default React.memo(ErrorMessage);
