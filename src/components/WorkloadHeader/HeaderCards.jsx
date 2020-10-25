import React, { useState } from "react";
import styles from "./WorkloadHeader.module.css";
import { Card, CircularLoader, NoticeBox } from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";
import { CovidIllustration } from "./svg/CovidIllustration.jsx";



const HeaderCards = (props) => {

  const query = {
    me: {
      resource: 'me',
    },
  }

  const numberOfContacts = props.numberOfCalls - props.numberOfIndexCases;

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
    </NoticeBox>
  }

  // Viser begge boksene
  if (props.displayText == "ALL") {
    return (
      <div className={styles.cards}>
        <Card
          className={styles.singleCard}
          dataTest="dhis2-uicore-card"
        >
            <h3>{`Hello ${data.me.firstName}!`}</h3>
            <CovidIllustration />
            <p> Keep up the good work! </p>
        </Card>

        <Card
          className={styles.singleCard}
          dataTest="dhis2-uicore-card"
        >
          <div className={styles.cardContent}>
            <h1>{props.numberOfIndexCases}</h1>
            <p> Health checks that needs to be performed </p>
          </div>
        </Card>

        <Card
          className={styles.singleCard}
          dataTest="dhis2-uicore-card"
        >
          <div className={styles.cardContent}>
            <h1>{numberOfContacts}</h1>
            <p> Contacts that needs to be contacted </p>
          </div>
        </Card>
      </div>
    );
  }

  // Viser bare index case boksen
  if (props.displayText == "INDEXES") {
    return (
      <div className={styles.cards}>
        <Card
          className={styles.singleCard}
          dataTest="dhis2-uicore-card"
        >
        <h3>{`Hello ${data.me.firstName}!`}</h3>
        <CovidIllustration />
        <p> Keep up the good work! </p>
        </Card>

        <Card
          className={styles.singleCard}
          dataTest="dhis2-uicore-card"
        >
          <div className={styles.cardContent}>
            <h1>{props.numberOfIndexCases}</h1>
            <p> Health checks that needs to be performed </p>
          </div>
        </Card>
      </div>
    );
  }

  //Viser bare contacts boksen
  if (props.displayText == "CONTACTS") {
    return (
      <div className={styles.cards}>
        <Card
          className={styles.singleCard}
          dataTest="dhis2-uicore-card"
        >
        <h3>{`Hello ${data.me.firstName}!`}</h3>
        <CovidIllustration />
        <p> Keep up the good work! </p>
        </Card>

        <Card
          className={styles.singleCard}
          dataTest="dhis2-uicore-card"
        >
          <div className={styles.cardContent}>
            <h1>{numberOfContacts}</h1>
            <p> Contacts that needs to be contacted </p>
          </div>
        </Card>
      </div>
    );
  }

};

export default HeaderCards;
