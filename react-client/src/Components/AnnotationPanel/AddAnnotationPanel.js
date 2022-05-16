import React, { useState, useEffect, useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageStore from "../../hooks/useLocalStorageStore";
import * as domUtils from "../../utils/domUtils";


const AddAnnotationPanel = React.memo(({onRemoveAnnotation, onUpdatedAnnotation, targetElement}) => {  
  const [txtInput, setTxtInput] = useState("");
  const [displayInput, setDisplayInput] = useState(false);
  const [annotationStore, setAnnotationStore] = useLocalStorageStore('annotation', []);
  const [textAreaHeight, setTextAreaHeight] = useState('');

  const txtInputRef = useRef(null);
  
  useEffect(() => {
    setTimeout(() => {
      txtInputRef.current.focus();
    }, 300);
    return () => {};
  }, []);
  
  useEffect(() => {      
    const hasExistingAnnotations = domUtils.hasAnnotations(annotationStore, targetElement);
    if (hasExistingAnnotations) {
      const domIdentifier = domUtils.getUniqueElementIdentifierByTagAndIndex(targetElement);

      let existingAnnotation = annotationStore.filter(
        (obj) => obj.domIndex === domIdentifier.index && obj.elem === domIdentifier.elType
      );
      setTxtInput(existingAnnotation[0].title);
      setDisplayInput(hasExistingAnnotations);
    }

    return () => {};
  }, [annotationStore]);  

  const onSubmitAnnotation = async (e) => {    
    const domIdentifier = domUtils.getUniqueElementIdentifierByTagAndIndex(targetElement);
    const elId = targetElement.id;
    const randomCode = uuidv4();   
    const duplicateIndex =  annotationStore.findIndex((obj) => obj.domIndex === domIdentifier.index && obj.elem === domIdentifier.elType);

    setTextAreaHeight('auto');

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

  const addAnnotation = async (domIdentifier, randomCode, elId, e) => {
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

  const updateAnnotation = async (duplicateIndex, e) => {
    e.preventDefault();
    const duplicateAnnotation = annotationStore.find((value, idx) => idx === duplicateIndex);
    duplicateAnnotation.title = txtInput;

    setAnnotationStore(annotationStore);
    await onUpdatedAnnotation();
  }

  const removeAnnotation = async (duplicateIndex, e) => {
    e.preventDefault();
    const filteredAnnotation = annotationStore.filter((value, idx) => idx !== duplicateIndex);

    setAnnotationStore(filteredAnnotation);
    await onRemoveAnnotation();
  }

  const onClickAnnotation = () => {
    setDisplayInput(false);
    setTextAreaHeight(`${txtInputRef.current.scrollHeight}px`);
  }

  const onChangeTextarea = (e) => {
    setTxtInput(e.target.value);
    setTextAreaHeight(`${txtInputRef.current.scrollHeight}px`);
  }

  return (
    <div className='add-annotation-panel'>   
      {displayInput ? 
        <label className='add-annotation-panel__header' onClick={onClickAnnotation}>
          {txtInput}          
        </label> :      
        <form className='add-annotation-panel__form' onSubmit={onSubmitAnnotation}>
          <div style={{ height: textAreaHeight, minHeight: '90px' }}>
            <textarea
              ref={txtInputRef}
              value={txtInput}          
              onChange={onChangeTextarea}
              type='text'
              className='add-annotation-panel__input'
              placeholder='The comment goes here'
              autoFocus
            />
          </div>
          <button>Submit</button>
        </form>     
      }
    </div>
  );
});

AddAnnotationPanel.displayName = 'AddAnnotationPanel';

export default AddAnnotationPanel;
