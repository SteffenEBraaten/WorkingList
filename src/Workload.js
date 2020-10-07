import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { Menu, MenuItem, Card } from "@dhis2/ui";
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

const fakeData = {
  cases: [
    {
      firstName: "Tine Margretha Vister",
    },
    {
      firstName: "Steffen Ekeberg Bråten",
    },
  ],
  contacts: [
    {
      contactNum: "1/2",
    },
    {
      contactNum: "6/7",
    },
  ],
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
      <div className={styles.wrapListHeadingWorkload}>
        <div class="">
          <Menu>
            <h3>Index cases</h3>
            {fakeData.cases.map((x) => (
              <MenuItem
                dataTest="dhis2-uicore-card"
                label={x.firstName}
                className={styles.listItemCaseWorkload}
              ></MenuItem>
            ))}
          </Menu>
        </div>
        <div class="">
          <Menu>
            <h3 className={styles.h3Center}>Contacts</h3>
            {fakeData.contacts.map((x) => (
              <MenuItem
                dataTest="dhis2-uicore-card"
                label={x.contactNum}
                className={styles.listItemContactWorkload}
              ></MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </>
  );
};
export default Workload;
