import React from 'react'


// TODO: Put window document store here...
const useDocumentStore = () => {
  
  const [state, setState] = React.useState(window.store);

  React.useEffect(() => {

    setState(window.store);

    return () => {
      
    }
  }, [window.store]);

  return state;
}

export default useDocumentStore


