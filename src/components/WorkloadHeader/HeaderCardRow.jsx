import React from "react";
import styles from "./WorkloadHeader.module.css";
import { Card, CircularLoader, NoticeBox } from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";
import { CovidIllustration } from "./svg/CovidIllustration.jsx";
import { CaseEnum } from "../Enum/Enum";
import { CounterCard } from "./CounterCard.jsx"

const HeaderCardRow = ({ numberOfFollowUps, numberOfHealthChecks, displayText }) => {
  const query = {
    me: {
      resource: "me",
    },
  };

  //Henter total lengde av tabellen og trekker fra antall index cases.
  const { error, loading, data } = useDataQuery(query);

  if (loading) {
    return <CircularLoader />;
  }

  if (error) {
    <NoticeBox
      error
      title="Could not get the name of the user"
      className={styles.centerElement}
    >
      Could not get the name of the user. Please try again later.
    </NoticeBox>;
  }
    const displayMessageHealthchecks = "Health checks that needs to be performed";
    const displayMessageContacts = "Contacts that needs to be contacted";


    if (displayText === CaseEnum.INDEXES) {
      return (
        <div className={styles.cardRow}>
          <Card className={styles.singleCard} dataTest="dhis2-uicore-card">
            <h3>{`Hello ${data.me.firstName}!`}</h3>
            <CovidIllustration />
            <p> Keep up the good work! </p>
          </Card>
          <CounterCard displayMessage={displayMessageHealthchecks} displayNumber={numberOfHealthChecks}/>
        </div>
      );
    }

    if (displayText === CaseEnum.CONTACTS) {
      return (
        <div className={styles.cardRow}>
          <Card className={styles.singleCard} dataTest="dhis2-uicore-card">
            <h3>{`Hello ${data.me.firstName}!`}</h3>
            <CovidIllustration />
            <p> Keep up the good work! </p>
          </Card>
          <CounterCard displayMessage={displayMessageContacts} displayNumber={numberOfFollowUps}/>
        </div>
    );

  } else {
    return (
      <div className={styles.cardRow}>
        <Card className={styles.singleCard} dataTest="dhis2-uicore-card">
          <h3>{`Hello ${data.me.firstName}!`}</h3>
          <CovidIllustration />
          <p> Keep up the good work! </p>
        </Card>
        <CounterCard displayMessage={displayMessageHealthchecks} displayNumber={numberOfHealthChecks}/>
        <CounterCard displayMessage={displayMessageContacts} displayNumber={numberOfFollowUps}/>
      </div>
    );
  }

};

export default HeaderCardRow;
