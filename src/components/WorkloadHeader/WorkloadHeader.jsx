import React, { useState } from "react";
import {
  SingleSelectField,
  SingleSelectOption,
  _dhis2_d2_i18n__WEBPACK_IMPORTED_MODULE_5___default,
  DropdownButton,
} from "@dhis2/ui";
import styles from "./WorkloadHeader.module.css";
import { CaseEnum, StatusEnum } from "../Enum/Enum";
import DateComponent from "./DateComponent";

const WorkloadHeader = (props) => {
  const [selectedFilter, setSelectedFilter] = useState(CaseEnum.ALL);
  const [status, setStatus] = useState(StatusEnum.ALL);

  const isToday = (date) => {
    const today = new Date()

    if (date.day === today.getDate() && date.month === today.getMonth() + 1 && date.year === today.getFullYear()) return true
    return false
  };

  const formatInputValue = (selectedDates) => {
    const from = selectedDates.from
    const to = selectedDates.to
    
    let fromString = ""
    if (isToday(from)) fromString += "Today"
    else fromString += `${from.day}/${from.month}/${from.year}`

    let toString = ""
    if (to === null) {}
    else if (isToday(to)) toString += "Today"
    else toString += `${to.day}/${to.month}/${to.year}`
    
    if (fromString === toString || toString === "") return fromString
    return `${fromString} - ${toString}`;
  };

  return (
    <div className={styles.workloadHeader}>

      {/* How to get number of follow up cases AND number of health checks: {props.numberOfCases} */}

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

      </div>
        <DropdownButton
          secondary
          className={styles.dropdownButton}
          component={<DateComponent toggleDate={props.toggleDate} dateSelected={props.datesSelected}/>}
          dataTest="dhis2-uicore-dropdownbutton"
        >
          {formatInputValue(props.datesSelected)}
        </DropdownButton>
    </div>
  );
};

export default WorkloadHeader;