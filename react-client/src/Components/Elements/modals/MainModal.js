import React from "react";
import { TransparentCloseButton } from "../../Elements/buttons/CloseButton";


const MainModal = ({ children = React.FC, type = "",  headerText="", onClose }) => {
  return (
    <div className={`${type}-panel`}>
      {headerText.trim() !== "" && (
        <div className={`${type}-header`}>
          {headerText}        
          <TransparentCloseButton onClickClose={onClose}/>
        </div>        
      )}
      {children}      
    </div>
  );
};

export default MainModal;
