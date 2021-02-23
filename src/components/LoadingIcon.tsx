import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./common.css";

const LoadingIcon: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="centerAlign">
      <CircularProgress />
    </div>
  );
};

export default React.memo(LoadingIcon);
