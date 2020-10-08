import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { Menu, MenuItem, CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./Workload.module.css";

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
  cases: [],
  contacts: [
    {
      contactNum: "1/2",
    },
    {
      contactNum: "6/7",
    },
  ],
};

const loadIndexCases = ({ allIndexCases }) => {
  allIndexCases.trackedEntityInstances.map(({ attributes }) => {
    const tempNameList = [];

    if (attributes.find((item) => item.code === "surname") !== undefined) {
      tempNameList.push({
        key: "lastName",
        value: attributes.find((item) => item.code === "surname").value,
      });
    }

    if (attributes.find((item) => item.code === "first_name") !== undefined) {
      tempNameList.push({
        key: "firstName",
        value: attributes.find((item) => item.code === "first_name").value,
      });
    }

    if (tempNameList.length !== 0) indexCases["cases"].push(tempNameList);
  });
};

const getName = () => {
  const nameList = [];
  indexCases.cases.map((thisCase) => {
    if (thisCase.length > 1)
      nameList.push(thisCase[1].value.concat(" ", thisCase[0].value));
    else nameList.push(thisCase[0].value);
  });

  return nameList;
};

const Workload = (props) => {
  const { error, loading, data } = useDataQuery(query);

  if (loading) {
    return <CircularLoader />;
  }
  if (error) {
    return (
      <NoticeBox error title="Could not get the data sets list">
        Could not fetch the working list. Please try again later.
      </NoticeBox>
    );
  }

  loadIndexCases(data);

  return (
    <>
      <div className={styles.wrapListHeadingWorkload}>
        {(props.indexFilterSelected === "1" ||
          props.indexFilterSelected === "2") && (
          <div>
            <Menu>
              <h3>Index cases</h3>
              {getName().map((name, key) => (
                <MenuItem
                  dataTest="dhis2-uicore-card"
                  label={name}
                  className={styles.listItemCaseWorkload}
                  key={key}
                />
              ))}
            </Menu>
          </div>
        )}
        {(props.indexFilterSelected === "1" ||
          props.indexFilterSelected === "3") && (
          <div>
            <Menu>
              <h3 className={styles.h3Center}>Contacts</h3>
              {indexCases.contacts.map((contact, key) => (
                <MenuItem
                  dataTest="dhis2-uicore-card"
                  label={contact.contactNum}
                  className={styles.listItemContactWorkload}
                  key={key}
                />
              ))}
            </Menu>
          </div>
        )}
      </div>
    </>
  );
};

export default Workload;
