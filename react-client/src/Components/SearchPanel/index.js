import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import SearchDialogBox from "./SearchDialogBox";

const index = () => {
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const switchSearch = () => {
    setShowSearchDialog(true);
  };

  const onCancelSearch = () => {
    setShowSearchDialog(false);
  };


  return (      
    <div className="search-panel">
      {showSearchDialog &&
       <SearchDialogBox
        onCancelSearch={onCancelSearch}
       />}
      <button className="search-panel__button-switch" onClick={switchSearch}>
        <AiOutlineSearch size={14} color="#263238" />
      </button>
    </div>
  );
};

export default index;
