import React from 'react'


const useLocalStorageStore = (storeName, isNotJSON) => {
  
  const [state, setState] = React.useState([]);

  
  React.useEffect(() => {
    
    let finalValue = getFinalValue();

    if (finalValue) {
      setState(finalValue);      
    }

    return () => {
      
    }
  }, []);

  React.useEffect(() => {

    let finalValue = isNotJSON ? state : JSON.stringify(state);

    
    localStorage.setItem(storeName, finalValue); //if state changes, sync it on localStorage
    return () => {
      
    }
  }, [state]);


  const getFinalValue = () => {
    const storedValue = localStorage.getItem(storeName);
    
    let finalValue;

    if (isNotJSON) {
      finalValue = storedValue;
    } else {

      if (storedValue) {
        finalValue = JSON.parse(storedValue) ?? [];
      }
    }

    return finalValue;
  }


  const setLocalStorage = (value) => {
    
    setState(value);
  }

  return [state, setLocalStorage];
}

export default useLocalStorageStore