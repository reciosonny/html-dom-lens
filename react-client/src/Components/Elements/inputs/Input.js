import React, {useState, useEffect, useRef} from 'react'

const Input = ({userInput = "", onChangeText}) => {
  const txtInputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      txtInputRef.current.focus();
    }, 300);
    return () => {};
  }, []);

  return (
    <>
      <input
        className='input-panel'
        placeholder='Bookmark Name'
        ref={txtInputRef}
        value={userInput}
        onChange={onChangeText}
        
      />
    </>
  )
}

export default Input