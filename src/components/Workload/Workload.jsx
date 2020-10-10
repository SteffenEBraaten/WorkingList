import React from "react";
import { Menu, MenuItem, CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./Workload.module.css";
import fetchAllTrackedEntityInstances, {
  generateIndexCases,
} from "../../api/TrackedEnitityInstancesAPI";
import trackerCaptureURL from "../../api/Urls";
/*
This file is for the 'main' page that contains list element 
(index cases ) and number of contacts
*/

const contactsList = {
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

const Workload = (props) => {
  const { error, loading, data } = fetchAllTrackedEntityInstances(
    "a8QXqdXyhNr"
  );

  if (loading) {
    return <CircularLoader />;
  }
  if (error) {
    return (
      <NoticeBox error title="Could not get working list">
        Could not get the working list. Please try again later.
      </NoticeBox>
    );
  }

  const indexCasesTest = generateIndexCases(data);

  return (
    <div className={styles.workloadContainer}>
      {(props.indexFilterSelected === "1" ||
        props.indexFilterSelected === "2") && (
        <div>
          <Menu>
            <h3>Index cases</h3>
            {indexCasesTest.map((indexCase, key) => (
              <MenuItem
                dataTest="dhis2-uicore-card"
                label={`${indexCase.firstName} ${indexCase.lastName}`}
                className={`${styles.case}  ${styles.listItem}`}
                key={key}
                href={`${trackerCaptureURL}tei=${indexCase.trackedEntityInstance}&program=DM9n1bUw8W8&ou=${indexCase.orgUnit}`}
                target="_blank"
              />
            ))}
          </Menu>
        </div>
      )}
      {(props.indexFilterSelected === "1" ||
        props.indexFilterSelected === "3") && (
        <div>
          <Menu>
            <h3>Contacts</h3>
            {contactsList.contacts.map((contact, key) => (
              <MenuItem
                dataTest="dhis2-uicore-card"
                label={contact.contactNum}
                className={styles.listItem}
                key={key}
              />
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Workload;
