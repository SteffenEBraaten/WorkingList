import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { Menu, MenuItem } from "@dhis2/ui";
import styles from "./App.module.css";
import WorkloadHeader from "./WorkloadHeader.js";

/*
This file is for the 'main' page that contains list element 
(index cases ) and number of contacts
*/

const query = {
  allIndexCases: {
    resource: "trackedEntityInstances",
    params: {
      ou: "BPzJYNBjmwO",
      ouMode: "DESCENDANTS",
      trackedEntity: "MCPQUTHX1Ze",
      program: "uYjxkTbwRNf",
      paging: false,
    },
  },
};

const Workload = () => {
  /*   const { error, loading, data } = useDataQuery(query);
   */
  /* if (error) {
    return <p>Error</p>;
  }
  if (loading) {
    return <p>Loading</p>;
  } */

  return (
    <>
      <div className={styles.wrapListItemWorkload}>
        <h3>Index cases</h3>
        <h3>Contacts</h3>
      </div>
      <Menu>
        {/* {data.trackedEntityInstances.map(({ sB1IHYu2xQT }) => ( */}
        <div className={styles.wrapListItemWorkload}>
          <MenuItem
            dataTest={`list-indexCases-${"firstName"}`}
            key={"firstName"}
            label={"Tine Margretha Vister"}
            className={styles.listItemCaseWorkload}
          />
          <MenuItem
            dataTest={`list-indexCases-${"firstName"}`}
            key={"firstName"}
            label={"1/3"}
            className={styles.listItemContactWorkload}
          />
        </div>
        <div className={styles.wrapListItemWorkload}>
          <MenuItem
            dataTest={`list-indexCases-${"firstName"}`}
            key={"firstName"}
            label={"Steffen Ekeberg Bråten"}
            className={styles.listItemCaseWorkload}
          />
          <MenuItem
            dataTest={`list-indexCases-${"firstName"}`}
            key={"firstName"}
            label={"0/9"}
            className={styles.listItemContactWorkload}
          />
        </div>
        <div className={styles.wrapListItemWorkload}>
          <MenuItem
            dataTest={`list-indexCases-${"firstName"}`}
            key={"firstName"}
            label={"Susanne Semsøy"}
            className={styles.listItemCaseWorkload}
          />
          <MenuItem
            dataTest={`list-indexCases-${"firstName"}`}
            key={"firstName"}
            label={"7/7"}
            className={styles.listItemContactWorkload}
          />
        </div>
        <div className={styles.wrapListItemWorkload}>
          <MenuItem
            dataTest={`list-indexCases-${"firstName"}`}
            key={"firstName"}
            label={"Steven H. Nguyen"}
            className={styles.listItemCaseWorkload}
          />
          <MenuItem
            dataTest={`list-indexCases-${"firstName"}`}
            key={"firstName"}
            label={"1/2"}
            className={styles.listItemContactWorkload}
          />
        </div>
        <div className={styles.wrapListItemWorkload}>
          <MenuItem
            dataTest={`list-indexCases-${"firstName"}`}
            key={"firstName"}
            label={"Thanh Thao Thi Tran"}
            className={styles.listItemCaseWorkload}
          />
          <MenuItem
            dataTest={`list-indexCases-${"firstName"}`}
            key={"firstName"}
            label={"2/4"}
            className={styles.listItemContactWorkload}
          />
        </div>
      </Menu>
    </>
  );
};
export default Workload;
