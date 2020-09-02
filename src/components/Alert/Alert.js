import React from "react";
import './styles.css';

const Alert = ({ alert }) => {

  return (
    <div className="alert">
      <h3>{alert}</h3>
    </div>
  );
};

export default Alert;