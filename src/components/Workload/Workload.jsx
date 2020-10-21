import React, { useEffect } from "react";
import { CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./Workload.module.css";
import { useDataQuery } from "@dhis2/app-runtime";
import { CaseEnum, StatusEnum } from "../Enum/Enum";

import {
  fetchContacts, generateResponse, fetchIndexcases
} from "../../api/TrackedEnitityInstancesAPI";
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
  const dateSelected = props.dateSelected;

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
          "enrollments",
          "lastUpdated",
          "inactive",
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
          "lastUpdated",
          "inactive",
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
    }

    else if (filtered === CaseEnum.INDEXES) fetchIndex();

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

  const both = indexCasesData.indexCases.trackedEntityInstances.concat(
    contactCasesData.contacts.trackedEntityInstances
  );

  const dataToDisplay =
    filtered === CaseEnum.ALL
      ? both
      : filtered === CaseEnum.INDEXES
        ? indexCasesData.indexCases.trackedEntityInstances
        : contactCasesData.contacts.trackedEntityInstances;

  // filter data on selected date
  const filterOnDate = (dataToDisplay, date) => {
    const newDataToDisplay = []
    const todayString = `${date.day}.${date.month}.${date.year}`

    for (var i = 0; i < dataToDisplay.length; i++){
      const selectedDate = toDateAndTimeFormat(dataToDisplay[i].lastUpdated, false)

      /* for (var j = 0; j<dataToDisplay[i].events.length; j++){
        if (dataToDisplay[i].events[j].status === "SCHEDULE"){
          console.log(dataToDisplay[i].events[j].dueDate)
        }
      } */

      if (todayString === selectedDate){
        newDataToDisplay.push(dataToDisplay[i])
      }
    }
    return newDataToDisplay
  }

  return (
    <div className={styles.workloadContainer}>
      <WorkloadTable data={filterOnDate(dataToDisplay, dateSelected)}/>
    </div>
  );
};

export default Workload;
