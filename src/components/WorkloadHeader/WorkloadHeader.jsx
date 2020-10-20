import React, { useState } from "react";
import {
  SingleSelectField,
  SingleSelectOption,
  _dhis2_d2_i18n__WEBPACK_IMPORTED_MODULE_5___default,
} from "@dhis2/ui";
import styles from "./WorkloadHeader.module.css";

const WorkloadHeader = (props) => {
  const [selectedFilter, setSelectedFilter] = useState("1");
  const [status, setStatus] = useState("ALL");
  const [selectedDay, setSelectedDay] = useState("1");

  return (
    <div className={styles.workloadHeader}>
      <div className={styles.singleSelectFieldContainer}>
        <SingleSelectField
          label="Show"
          selected={selectedFilter}
          className={styles.singleSelectField}
          onChange={function onChange(value) {
            props.toggleFilter(value.selected.toString());
            setSelectedFilter(value.selected.toString());
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
          label="Status"
          selected={status}
          className={styles.singleSelectField}
          onChange={function onChange(value) {
            props.toggleStatus(value.selected.toString());
            setStatus(value.selected.toString());
          }}
        >
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="All"
            value="ALL"
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Completed"
            value="COMPLETED"
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Not completed"
            value="ACTIVE"
          />
        </SingleSelectField>
        <SingleSelectField
          label="Dates"
          selected={selectedDay}
          className={styles.singleSelectField}
        >
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Today"
            value="1"
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Tomorrow"
            value="2"
          />
        </SingleSelectField>
      </div>
    </div>
  );
};

export default WorkloadHeader;
