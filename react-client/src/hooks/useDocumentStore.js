import React from 'react'


// TODO: Put window document store here...
const useDocumentStore = () => {
  
  const [state, setState] = React.useState(window.store);

  React.useEffect(() => {

    if(!window.store) { //initialize window.store if it doesn't have any value yet.
      window.store = {
        focusMode: false,
        switchExtensionFunctionality: true,
        bookmarkBtnClicked: false //we can use this to set a guard to `onClick` event we wired up using plain javascript to prevent those logic from getting mixed up
      };      
    }


    setState(window.store);

    return () => {
      
    }
  }, []);

  // When state is changed, update window.store DB
  React.useEffect(() => {
    
    window.store = state;

    return () => {
    
    }
  }, [state]);


  const setDocumentStore = (value) => {
    setState(value);
  }

  return [state, setDocumentStore];
}

export default useDocumentStore


