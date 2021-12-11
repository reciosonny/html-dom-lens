import React from "react";
import { AiOutlineClose } from "react-icons/ai";
const AddAnnotationPanel = ({ domType, elClassNames, saveAnnotation, onClose, x, y, domId }) => (  
 // <div className="add__annotation-panel" style={{ top: y + 173, left: x + 20 }}>
  <div className="add__annotation-panel" style={{ top: y + 270, left: x + 15 }}>
    <span className="header">
      <h3 className="header-text">Save Annotation</h3>
      <button className="header__close-btn" type="button" onClick={onClose}>
        <AiOutlineClose size={14} />
      </button>
    </span>
    <form className='frm-panel' data-id={domId} onSubmit={saveAnnotation}>    
      <input
        type="text" className="txt__annotation-name" placeholder="The comment goes here"
      />
    </form>
   
  </div>
);

export default AddAnnotationPanel;
