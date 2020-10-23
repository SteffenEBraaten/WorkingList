import React from "react";
import styles from "./Workload.module.css";
import { 
    _dhis2_d2_i18n__WEBPACK_IMPORTED_MODULE_5___default,
    Input, 
  } from "@dhis2/ui";

const SearchComponent = (props) => {
  return (
    <div className={styles.searchComponent}>
       <Input
          dataTest="dhis2-uiwidgets-input"
          name="searchBar"
          onChange={function onChange(value){
            props.setSearchValue(value.value.toLowerCase())
          }}
          placeholder="Search for index case or contact"
          type="text"
        />
    </div>
  );
};

export default SearchComponent;
