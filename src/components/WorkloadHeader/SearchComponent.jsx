import React from "react";
import styles from "./WorkloadHeader.module.css";
import { Input } from "@dhis2/ui";

const SearchComponent = ({ setSearchValue }) => {
  return (
    <div className={styles.searchComponent}>
      <Input
        dataTest="dhis2-uiwidgets-input"
        name="searchBar"
        onChange={function onChange(value) {
          setSearchValue(value.value.toLowerCase());
        }}
        placeholder="Search for index case or contact"
        type="text"
      />
    </div>
  );
};

export default SearchComponent;
