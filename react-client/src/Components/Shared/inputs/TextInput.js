import React, {useState, useEffect, useRef} from 'react'

const TextInput = ({userInput = "", onChangeText, placeHolder= "Input Here"}) => {
  const txtInputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      txtInputRef.current.focus();
    }, 300);
    return () => {};
  }, []);

  return (    
    <textarea
      className='text-area-panel'      
      placeholder={placeHolder}
      ref={txtInputRef}
      value={userInput}
      onChange={onChangeText}
    />    
  )
}

export default TextInput