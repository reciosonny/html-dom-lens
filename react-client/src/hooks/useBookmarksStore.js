import React from 'react'

const useBookmarksStore = () => {
  
  const [state, setState] = React.useState([]);

  const storeBookmarks = localStorage.getItem("bookmarks");
  
  React.useEffect(() => {

    setState(JSON.parse(storeBookmarks) ?? []);

    return () => {
      
    }
  }, [storeBookmarks]);

  return state;
}

export default useBookmarksStore
