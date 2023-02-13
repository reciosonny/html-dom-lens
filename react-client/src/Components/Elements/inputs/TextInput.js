import React, {useState, useEffect, useRef} from 'react'

const TextInput = ({userInput = "", onChangeText}) => {
  const txtInputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      txtInputRef.current.focus();
    }, 300);
    return () => {};
  }, []);

  return (
    <>
      <textarea
        className='text-area-panel'
        placeholder='The comment goes here'
        ref={txtInputRef}
        value={userInput}
        onChange={onChangeText}
      />
    </>
  )
}

export default TextInput