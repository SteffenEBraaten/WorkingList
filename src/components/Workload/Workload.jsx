import React, { useEffect } from "react";
import { CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./Workload.module.css";
import { useDataQuery } from "@dhis2/app-runtime";
import { CaseEnum, StatusEnum } from "../Enum/Enum";
import { WorkloadTable, toDateAndTimeFormat } from "./WorkloadTable";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
/*
This file is for the 'main' page that contains list element 
(index cases ) and number of contacts
*/

/*
  1: index cases and contacts
  2: index cases
  3: contact cases
*/

const Workload = (props) => {
  const filtered = props.indexFilterSelected;
  const caseStatus = props.statusSelected;
  const datesSelected = props.datesSelected;

  const option = {
    variables: {
      programStatus: caseStatus,
    },
  };

  const queryContact = {
    contacts: {
      resource: "trackedEntityInstances",
      params: ({ programStatus }) => ({
        program: "DM9n1bUw8W8",
        ou: "a8QXqdXyhNr",
        fields: [
          "created",
          "orgUnit",
          "attributes",
          "trackedEntityType",
          "trackedEntityInstance",
          "relationships",
          "enrollments",
          "lastUpdated",
          "inactive",
          "events",
        ],
        programStatus: programStatus !== "ALL" ? programStatus : null,

        paging: false,
      }),
    },
  };

  const queryIndex = {
    indexCases: {
      resource: "trackedEntityInstances",
      params: ({ programStatus }) => ({
        program: "uYjxkTbwRNf",
        ou: "a8QXqdXyhNr",
        fields: [
          "created",
          "orgUnit",
          "attributes",
          "trackedEntityType",
          "trackedEntityInstance",
          "enrollments",
          "relationships",
          "lastUpdated",
          "inactive",
          "events",
        ],
        programStatus: programStatus !== "ALL" ? programStatus : null,
        paging: false,
      }),
    },
  };

  const {
    error: indexCaseError,
    loading: indexCaseLoading,
    data: indexCasesData,
    refetch: indexcaseRefetch,
  } = useDataQuery(queryIndex, option);

  const {
    error: contactCaseError,
    loading: contactCaseLoading,
    data: contactCasesData,
    refetch: contactCaseRefetch,
  } = useDataQuery(queryContact, option);

  useEffect(() => {
    async function fetchIndex() {
      await indexcaseRefetch(option.variables);
    }
    async function fetchContact() {
      await contactCaseRefetch(option.variables);
    }

    if (filtered === CaseEnum.ALL) {
      fetchIndex();
      fetchContact();
    } else if (filtered === CaseEnum.INDEXES) fetchIndex();
    else fetchContact();
  }, [filtered, caseStatus]);

  if (indexCaseLoading || contactCaseLoading) {
    return <CircularLoader className={styles.centerElement} />;
  }

  if (indexCaseError || contactCaseError) {
    return (
      <NoticeBox
        error
        title="Could not get working list"
        className={styles.centerElement}
      >
        Could not get the working list. Please try again later.
      </NoticeBox>
    );
  }

  console.log(indexCasesData);
  const both = indexCasesData.indexCases.trackedEntityInstances.concat(
    contactCasesData.contacts.trackedEntityInstances
  );

  let dataToDisplay =
    filtered === CaseEnum.ALL
      ? both
      : filtered === CaseEnum.INDEXES
      ? indexCasesData.indexCases.trackedEntityInstances
      : contactCasesData.contacts.trackedEntityInstances;

  // filter data on selected date
  const filterOnDate = (dataToDisplay, dates) => {
    const newDataToDisplay = []

    const from = dates.from
    const fromDate = new Date(`${from.year}`, `${from.month}`, `${from.day}`)

    const to = dates.to
    const toDate = to === null ? fromDate : new Date(`${to.year}`, `${to.month}`, `${to.day}`)

    // loop through data
    for (var i = 0; i < dataToDisplay.length; i++) {
      // loop through events
      for (var j = 0; j<dataToDisplay[i].enrollments[0].events.length; j++){
        const event = dataToDisplay[i].enrollments[0].events[j]
        const dueDateList = toDateAndTimeFormat(event.dueDate, false).split(".")
        const dueDate = new Date(dueDateList[2], dueDateList[1], dueDateList[0]) // formate Date object to prepare for comparing
        
        if (event.status === "SCHEDULE" && (dueDate >= fromDate && dueDate <= toDate)){
          newDataToDisplay.push(dataToDisplay[i])
          break;
        }
      }
    }
    return newDataToDisplay;
  };

  dataToDisplay = filterOnDate(dataToDisplay, datesSelected)
  props.setNumberOfCases(dataToDisplay.length)

  return (
    <div className={styles.workloadContainer}>
      <WorkloadTable data={dataToDisplay}/>
    </div>
  );
};

export default Workload;
