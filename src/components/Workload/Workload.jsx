import React, { useState, useEffect } from "react";
import { CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./Workload.module.css";
import {
  fetchContacts, generateResponse, fetchIndexcases
} from "../../api/TrackedEnitityInstancesAPI";
import WorkloadTable from "./WorkloadTable";
import { useDataQuery } from "@dhis2/app-runtime";

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

  // const option = {
  //   variables: {
  //     programStatus: caseStatus
  //   }
  // }
  // const query = {
  //   allIndexCases: {
  //     resource: "trackedEntityInstances",
  //     params: ({ programStatus }) => ({
  //       program: "uYjxkTbwRNf",
  //       ou: "a8QXqdXyhNr",
  //       fields: ["created,orgUnit,attributes,trackedEntityType,trackedEntityInstance,enrollments,lastUpdated,inactive"],
  //       // filter: `programStatus:eq:${programStatus}`,
  //       programStatus: status !== "ALL" ? status : null,

  //       paging: false,
  //     })
  //   }
  // };
  const {
    error: indexCaseError, loading: indexCaseLoading, data: indexCasesData, refetch: indexcaseRefetch
  } = fetchIndexcases("a8QXqdXyhNr", caseStatus);
  const {
    error: contactCaseError, loading: contactCaseLoading, data: contactCasesData, refetch: contactCaseRefetch
  } = fetchContacts(
    "a8QXqdXyhNr", caseStatus
  );
  useEffect(() => {
    async function fetchIndex() {
      await indexcaseRefetch("a8QXqdXyhNr", caseStatus);
      console.warn("Fetching index cases: ", indexCasesData)

    };
    async function fetchContact() {
      await contactCaseRefetch("a8QXqdXyhNr", caseStatus);
      console.warn("Fetching contactss: ", contactCasesData)

    };
    if (filtered == "1") {
      fetchIndex();
      fetchContact();
    }
    else if (filtered == "2")
      fetchIndex();
    else
      fetchContact();
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


  const indexCases = generateResponse(indexCasesData);
  const contacts = generateResponse(contactCasesData);
  const both = indexCases.concat(contacts)
  const dataToDisplay = filtered == "1" ? both : (filtered == "2" ? indexCases : contacts);

  return (
    <div className={styles.workloadContainer}>
      <WorkloadTable data={dataToDisplay} />
    </div>
  );
};

export default Workload;
