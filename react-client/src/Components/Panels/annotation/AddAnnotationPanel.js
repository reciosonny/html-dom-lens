import React, { useState, useEffect, memo } from 'react'
import MainModal from '../../Elements/modals/MainModal'
import SubmitButton from '../../Elements/buttons/SubmitButton';
import { v4 as uuidv4 } from "uuid";
import useLocalStorageStore from "../../../hooks/useLocalStorageStore";
import * as domUtils from "../../../utils/domUtils";
import TextInput from '../../Elements/inputs/TextInput';

const AnnotationPanel = memo (({onRemoveAnnotation, onUpdatedAnnotation, targetElement}) => {
  const [txtInput, setTxtInput] = useState("");
  const [annotationStore, setAnnotationStore] = useLocalStorageStore('annotation', []);
  const [displayInput, setDisplayInput] = useState(false);

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
    e.preventDefault();        
    const domIdentifier = domUtils.getUniqueElementIdentifierByTagAndIndex(targetElement);
    const elId = targetElement.id;
    const randomCode = uuidv4();   
    const duplicateIndex =  annotationStore.findIndex((obj) => obj.domIndex === domIdentifier.index && obj.elem === domIdentifier.elType);

    // setTextAreaHeight('auto');

    if (duplicateIndex !== -1) {
      if (txtInput.trim() !== "") {
        updateAnnotation(duplicateIndex, e);
      } else {
        removeAnnotation(duplicateIndex, e);
      }
    } else {
      addAnnotation(domIdentifier, randomCode, elId, e);
    }
    if (txtInput.trim() !== "")setDisplayInput(true)       
  };

  const addAnnotation = async (domIdentifier, randomCode, elId, e) => {
    e.preventDefault();
    let annotationObj = {
      id: randomCode,
      title: txtInput || "",
      elem: domIdentifier.elType,
      elId,
      domIndex: domIdentifier.index,
      // link: window.location.href,
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
    // setTextAreaHeight(`${txtInputRef.current.scrollHeight}px`);
  }
  
  const onChangeText = (e) => {
    setTxtInput(e.target.value);
    // setTextAreaHeight(`${txtInputRef.current.scrollHeight}px`);
  }

  return (
    <MainModal type= 'annotation'>
      {displayInput ? 
        <label className='annotation-header' onClick={onClickAnnotation}>
          {txtInput}          
        </label> :       
        <form >
          <TextInput userInput={txtInput} onChangeText={onChangeText}/>
          <SubmitButton display='Submit' onClickSubmit={onSubmitAnnotation}/>      
        </form>
      }
    </MainModal>
  )
})

export default AnnotationPanel