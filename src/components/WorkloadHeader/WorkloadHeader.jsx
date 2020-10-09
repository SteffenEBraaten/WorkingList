import React, { useState } from "react";
import {
  InputField,
  SingleSelectField,
  SingleSelectOption,
  _dhis2_d2_i18n__WEBPACK_IMPORTED_MODULE_5___default,
} from "@dhis2/ui";
import styles from "./WorkloadHeader.module.css";

const WorkloadHeader = (props) => {
  const [selected, setSelected] = useState("1");
  return (
    <div className="workloadHeader">
      <div className={styles.singleSelectFields}>
        <SingleSelectField
          required
          selected={selected}
          className={styles.dropDownOptionLayout}
          onChange={function onChange(value) {
            props.toggle(value.selected.toString());
            setSelected(value.selected.toString());
          }}
        >
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Index cases and contacts"
            value="1"
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Index cases"
            value="2"
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Contacts"
            value="3"
          />
        </SingleSelectField>
        <SingleSelectField
          required
          selected="All"
          className={styles.dropDownOptionLayout}
        >
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="All"
            value="All"
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Completed"
            value="Completed"
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Not completed"
            value="Not completed"
          />
        </SingleSelectField>
        <SingleSelectField
          required
          selected="Today"
          className={styles.dropDownOptionLayout}
        >
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Today"
            value="Today"
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Tomorrow"
            value="Tomorrow"
          />
        </SingleSelectField>
      </div>
      
    </div>
  );
};

export default WorkloadHeader;
