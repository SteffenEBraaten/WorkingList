import React from "react";
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
  const indexCasesData = fetchIndexcases(
    "a8QXqdXyhNr"
  );
  const contactCasesData = fetchContacts(
    "a8QXqdXyhNr"
  );

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

  const indexCases = generateResponse(indexCasesData.data);
  const contacts = generateResponse(contactCasesData.data);
  const both = indexCases.concat(contacts)

  const dataToDisplay = filtered == "1" ? both : (filtered == "2" ? indexCases : contacts)
  return (
    <div className={styles.workloadContainer}>
      <WorkloadTable data={dataToDisplay} />
    </div>
  );
};

export default Workload;
