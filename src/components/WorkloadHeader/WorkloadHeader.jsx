import React, { useState } from "react";
import {
  SingleSelectField,
  SingleSelectOption,
  DropdownButton,
} from "@dhis2/ui";
import styles from "./WorkloadHeader.module.css";
import { CaseEnum, StatusEnum } from "../Enum/Enum";
import DateComponent from "./DateComponent";
import HeaderCardRow from "./HeaderCardRow";
import MunicipalityChooser from "./MunicipalityChooser";
import SearchComponent from "./SearchComponent";
import { useUserUpdate } from "./UserContext";
import { useDataQuery } from "@dhis2/app-runtime";

const query = {
  me: {
    resource: "me",
  },
};

const WorkloadHeader = ({
  toggleFilter,
  toggleStatus,
  toggleDate,
  datesSelected,
  numberOfFollowUps,
  numberOfHealthChecks,
  setSearchValue,
  orgUnit,
  setOrgUnit,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(CaseEnum.ALL);
  const [status, setStatus] = useState(StatusEnum.ACTIVE);
  const updateUserState = useUserUpdate();

  const isToday = (date) => {
    const today = new Date();

    if (
      date.day === today.getDate() &&
      date.month === today.getMonth() + 1 &&
      date.year === today.getFullYear()
    )
      return true;
    return false;
  };

  const formatInputValue = (selectedDates) => {
    const from = selectedDates.from;
    const to = selectedDates.to;

    let fromString = "";
    if (isToday(from)) fromString += "Today";
    else fromString += `${from.day}/${from.month}/${from.year}`;

    let toString = "";
    if (to === null) {
    } else if (isToday(to)) toString += "Today";
    else toString += `${to.day}/${to.month}/${to.year}`;

    if (fromString === toString || toString === "") return fromString;
    return `${fromString} - ${toString}`;
  };

  const { data, loading, error } = useDataQuery(query);
  updateUserState({ data, loading, error });

  return (
    <div className={styles.workloadHeader}>
      <HeaderCardRow
        numberOfFollowUps={numberOfFollowUps}
        numberOfHealthChecks={numberOfHealthChecks}
        displayText={selectedFilter}
      />
      <div className={styles.filterContainer}>
        <SingleSelectField
          label="Show"
          selected={selectedFilter}
          className={styles.singleSelectField}
          onChange={function onChange(value) {
            toggleFilter(value.selected.toString());
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
            toggleStatus(value.selected.toString());
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
            value={StatusEnum.ACTIVE}
          />
        </SingleSelectField>
        <DropdownButton
          secondary
          className={styles.dropDownButtonDateComponent}
          component={
            <DateComponent
              toggleDate={toggleDate}
              dateSelected={datesSelected}
            />
          }
          dataTest="dhis2-uicore-dropdownbutton"
        >
          {formatInputValue(datesSelected)}
        </DropdownButton>
      </div>
      <div className={styles.tableHeaderWrapper}>
        <MunicipalityChooser orgUnit={orgUnit} setOrgUnit={setOrgUnit} />
        <SearchComponent setSearchValue={setSearchValue} />
      </div>
    </div>
  );
};

export default WorkloadHeader;
