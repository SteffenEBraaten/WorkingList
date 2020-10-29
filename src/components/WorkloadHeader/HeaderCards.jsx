import React from "react";
import styles from "./WorkloadHeader.module.css";
import { Card, CircularLoader, NoticeBox } from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";
import { CovidIllustration } from "./svg/CovidIllustration.jsx";
import { CaseEnum } from "../Enum/Enum";

const HeaderCards = ({ numberOfFollowUps, numberOfHealthChecks, displayText }) => {
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

  //Sjekker om index cases eller contacts er valgt
  if (displayText === CaseEnum.INDEXES ||  displayText === CaseEnum.CONTACTS) {

    let displayNumber = numberOfHealthChecks;
    let displayMessage = " Health checks that needs to be performed ";

    if (displayText === CaseEnum.CONTACTS){
      displayNumber = numberOfFollowUps;
      displayMessage = " Contacts that needs to be contacted "
    }

    // Viser enten index cases eller contacts
    return (
      <div className={styles.cards}>
        <Card className={styles.singleCard} dataTest="dhis2-uicore-card">
          <h3>{`Hello ${data.me.firstName}!`}</h3>
          <CovidIllustration />
          <p> Keep up the good work! </p>
        </Card>

        <Card className={styles.singleCard} dataTest="dhis2-uicore-card">
          <div className={styles.cardContent}>
            <h1>{displayNumber}</h1>
            <p>{displayMessage}</p>
          </div>
        </Card>
      </div>
    );
  }

  // Viser både index cases og contacts
  else {
    return (
      <div className={styles.cards}>
        <Card className={styles.singleCard} dataTest="dhis2-uicore-card">
          <h3>{`Hello ${data.me.firstName}!`}</h3>
          <CovidIllustration />
          <p> Keep up the good work! </p>
        </Card>

        <Card className={styles.singleCard} dataTest="dhis2-uicore-card">
          <div className={styles.cardContent}>
            <h1>{numberOfHealthChecks}</h1>
            <p> Health checks that needs to be performed </p>
          </div>
        </Card>

        <Card className={styles.singleCard} dataTest="dhis2-uicore-card">
          <div className={styles.cardContent}>
            <h1>{numberOfFollowUps}</h1>
            <p> Contacts that needs to be contacted </p>
          </div>
        </Card>
      </div>
    );
  }
};

export default HeaderCards;
