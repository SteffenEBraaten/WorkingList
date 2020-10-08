import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { Menu, MenuItem, Card } from "@dhis2/ui";
import styles from "./App.module.css";
import WorkloadHeader from "./WorkloadHeader.js";
import { ContentWriter } from "istanbul-lib-report";
import { list } from "postcss";

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

const indexCases = {
  cases: [ ],
  contacts: [
    {
      contactNum: "1/2",
    },
    {
      contactNum: "6/7",
    },
  ],
};

const loadIndexCases = () => {
  const { error, loading, data } = useDataQuery(query);

  if (error) {
    return <p>Error</p>;
  }
  if (loading) {
    return <p>Loading</p>;
  }

  data.allIndexCases.trackedEntityInstances.map(({ attributes }) => {
    var tempNameList = []

    if (attributes.find(item => item.code === "surname") !== undefined){
      tempNameList.push({
        key: "lastName",
        value: attributes.find(item => item.code === "surname").value
      })
    }

    if (attributes.find(item => item.code === "first_name") !== undefined){
      tempNameList.push({
        key: "firstName",
        value: attributes.find(item => item.code === "first_name").value
      })
    }

    if (tempNameList.length !== 0) indexCases["cases"].push(tempNameList)
  });
}

const getName = () => {
  var nameList = []
  indexCases.cases.map((x) => {
    if (x.length > 1) nameList.push(x[1].value.concat(" ", x[0].value))
    else nameList.push(x[0].value)
  })

  return nameList
} 

const Workload = () => {
  loadIndexCases()

  return (
    <>
      <div className={styles.wrapListHeadingWorkload}>
        <div class="">
          <Menu>
            <h3>Index cases</h3>
            {getName().map((x) => (
                <MenuItem
                  dataTest="dhis2-uicore-card"
                  label={x}
                  className={styles.listItemCaseWorkload}
                ></MenuItem>
              ))
            }
          </Menu>
        </div>
        <div class="">
          <Menu>
            <h3 className={styles.h3Center}>Contacts</h3>
            {indexCases.contacts.map((x) => (
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
