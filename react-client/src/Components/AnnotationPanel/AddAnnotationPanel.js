import React, { useState, useEffect, useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineClose } from "react-icons/ai";
import GlobalContext from "../../store/global-context";
import useLocalStorageStore from "../../hooks/useLocalStorageStore";
import * as domUtils from "../../utils/domUtils";


const AddAnnotationPanel = React.memo(({onRemoveAnnotation, onUpdatedAnnotation, targetElement}) => {  
  const [txtInput, setTxtInput] = useState("");
  const [displayInput, setDisplayInput] = useState(false);
  const [annotationStore, setAnnotationStore] = useLocalStorageStore('annotation', []);
  const txtInputRef = useRef(null);
  
  useEffect(() => {
    setTimeout(() => {
      txtInputRef.current.focus();
    }, 300);
    return () => {};
  }, []);
  
  useEffect(() => {      
    const hasExistingAnnotations = domUtils.hasAnnotations(annotationStore, targetElement);
    if (hasExistingAnnotations === true) {
      const domIdentifier = domUtils.getUniqueElementIdentifierByTagAndIndex(targetElement);

      let existingAnnotation = annotationStore.filter(
        (obj) =>obj.domIndex == domIdentifier.index && obj.elem == domIdentifier.elType
      );

      setTxtInput( hasExistingAnnotations === true ? existingAnnotation[0].title : null);
      setDisplayInput(hasExistingAnnotations === true ? true : false);
    }

    return () => {};
  }, [annotationStore]);  

  const onSubmitAnnotation = async (e) => {    
    const domIdentifier = domUtils.getUniqueElementIdentifierByTagAndIndex(targetElement);
    const elId = targetElement.id;
    const randomCode = uuidv4();   
    const duplicateIndex =  annotationStore.findIndex((obj) => obj.domIndex === domIdentifier.index && obj.elem === domIdentifier.elType);    
    
    if (duplicateIndex !== -1) {
      if (txtInput.trim() !== "") {
        updateAnnotation(duplicateIndex, e);
      } else {
        removeAnnotation(duplicateIndex, e);
      }
    } else {
      addAnnotation(domIdentifier, randomCode, elId, e);
    }
    setDisplayInput(true)       
  };

  const addAnnotation = async (domIdentifier, randomCode, elId, e) =>{
    e.preventDefault();
    let annotationObj = {
      id: randomCode,
      title: txtInput || "",
      elem: domIdentifier.elType,
      elId,
      domIndex: domIdentifier.index,
      link: window.location.href,
    };
    
    const newAnnotation = [...annotationStore, annotationObj];
    setAnnotationStore(newAnnotation);
    await onUpdatedAnnotation();
  }

  const updateAnnotation = async (duplicateIndex, e) =>{
    e.preventDefault();
    const duplicateAnnotation =  annotationStore.find((value,idx) => idx === duplicateIndex);
    duplicateAnnotation.title = txtInput
    setAnnotationStore(annotationStore);
    await onUpdatedAnnotation();
  }

  const removeAnnotation = async (duplicateIndex, e) =>{
    e.preventDefault();
    const filteredAnnotation =  annotationStore.filter((value,idx) => idx !== duplicateIndex);
    setAnnotationStore(filteredAnnotation);
    await onRemoveAnnotation();
  }

  const onClickAnnotation = () =>{
    setDisplayInput(false)
  }  
   
  return (
    <div className='add-annotation-panel'>   
      {displayInput == true ? 
        <label className='add-annotation-panel__header' onClick={onClickAnnotation}>
          {txtInput}          
        </label> :      
        <form className='frm-panel'  onSubmit={onSubmitAnnotation} >
          <input
            ref={txtInputRef}
            value={txtInput}          
            onChange={(e) => setTxtInput(e.target.value)}
            type='text'
            className='txt__annotation-name'
            placeholder='The comment goes here'
            autoFocus
          />
        </form>     
      }
    </div>
  );
});

AddAnnotationPanel.displayName = 'AddAnnotationPanel';

export default AddAnnotationPanel;
