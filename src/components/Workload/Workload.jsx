import React, { useState, useEffect } from "react";
import { CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./Workload.module.css";
import {
  fetchContacts, generateResponse, fetchIndexcases
} from "../../api/TrackedEnitityInstancesAPI";
import WorkloadTable from "./WorkloadTable";
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
  let indexCasesData = fetchIndexcases("a8QXqdXyhNr", caseStatus);
  let contactCasesData = fetchContacts(
    "a8QXqdXyhNr", caseStatus
  );
  useEffect(() => {
    console.log("Changes")
    async function refetch() {
      // TODOS: refetching doesnt fetch data with new casestatus
      const test = await indexCasesData.refetch();
    };
    console.warn(refetch())
    // contactCasesData.refetch();
  }, [caseStatus]);

  if (indexCasesData.loading || contactCasesData.loading) {
    return <CircularLoader className={styles.centerElement} />;
  }
  if (indexCasesData.error || contactCasesData.error) {
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

  let indexCases = generateResponse(indexCasesData.data);
  console.log(indexCases, caseStatus)
  let contacts = generateResponse(contactCasesData.data);
  let both = indexCases.concat(contacts)
  const dataToDisplay = filtered == "1" ? both : (filtered == "2" ? indexCases : contacts)
  return (
    <div className={styles.workloadContainer}>
      <WorkloadTable data={dataToDisplay} />
    </div>
  );
};

export default Workload;
