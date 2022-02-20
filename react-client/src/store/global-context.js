import React from 'react';


const GlobalContext = React.createContext({
  selectedDom: null,
  onChangeBookmarks: () => {}
});

GlobalContext.displayName = "GlobalContext";



export default GlobalContext;