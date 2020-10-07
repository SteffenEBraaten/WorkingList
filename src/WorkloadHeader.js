import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import {
  DropdownButton,
  InputField,
  SingleSelectField,
  SingleSelectOption,
  _dhis2_d2_i18n__WEBPACK_IMPORTED_MODULE_5___default,
} from "@dhis2/ui";
import styles from "./App.module.css";
import i18n from "@dhis2/d2-i18n";

const WorkloadHeader = () => {
  return (
    <div class="workloadHeader">
      <div className={styles.singleSelectFields}>
        <SingleSelectField
          required
          selected="Index cases and contacts"
          className={styles.dropDownOptionLayout}
        >
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Index cases and contacts"
            value="Index cases and contacts"
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Index cases"
            value="Index cases"
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Contacts"
            value="Contacts"
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
      <InputField
        dataTest="dhis2-uiwidgets-inputfield"
        name="Default"
        className={styles.inputField}
        onChange={function logger(_ref) {
          var name = _ref.name,
            value = _ref.value;
          return console.info("".concat(name, ": ").concat(value));
        }}
        placeholder="Search for person"
      />
    </div>
  );
};
export default WorkloadHeader;
