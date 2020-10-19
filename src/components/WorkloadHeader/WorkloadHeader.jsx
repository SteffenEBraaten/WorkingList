import React, { useState } from "react";
import {
  SingleSelectField,
  SingleSelectOption,
  _dhis2_d2_i18n__WEBPACK_IMPORTED_MODULE_5___default,
} from "@dhis2/ui";
import styles from "./WorkloadHeader.module.css";
import { CaseEnum, StatusEnum, DateEnum } from "../Enum/Enum";
import ChooseDate from "./ChooseDate.jsx";

const WorkloadHeader = (props) => {
  const [selectedFilter, setSelectedFilter] = useState(CaseEnum.ALL);
  const [status, setStatus] = useState(StatusEnum.ALL);
  const [selectedDay, setSelectedDay] = useState(DateEnum.TODAY);
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
            value={CaseEnum.ALL}
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Index cases"
            value={CaseEnum.INDEXES}
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Contacts"
            value={CaseEnum.CONTACTS}
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
            value={StatusEnum.ALL}

          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Completed"
            value={StatusEnum.COMPLETED}
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Not completed"
            value={StatusEnum.ACTVE}
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
            value={DateEnum.TODAY}
          />
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label="Tomorrow"
            value={DateEnum.TOMORROW}
          />
        </SingleSelectField>
      </div>

      <ChooseDate />

    </div>
  );
};

export default WorkloadHeader;
