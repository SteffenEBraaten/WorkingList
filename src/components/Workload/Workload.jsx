import React from "react";
import { CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./Workload.module.css";
import fetchAllTrackedEntityInstances, {
  generateResponse,
} from "../../api/TrackedEnitityInstancesAPI";
import WorkloadTable from "./WorkloadTable";
/*
This file is for the 'main' page that contains list element 
(index cases ) and number of contacts
*/

const Workload = (props) => {
  const { error, loading, data } = fetchAllTrackedEntityInstances(
    "a8QXqdXyhNr"
  );

  if (loading) {
    return <CircularLoader className={styles.centerElement} />;
  }
  if (error) {
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

  const indexCases = generateResponse(data);

  return (
    <div className={styles.workloadContainer}>
        <WorkloadTable data={indexCases} />
    </div>
  );
};

export default Workload;
