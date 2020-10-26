import React, { useState } from "react";
import styles from "./WorkloadHeader.module.css";
import { Card, CircularLoader, NoticeBox } from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";
import { CovidIllustration } from "./svg/CovidIllustration.jsx";
import { CaseEnum, DueDateEnum } from "../Enum/Enum";

const HeaderCards = (props) => {

  const query = {
    me: {
      resource: 'me',
    },
  };
  //Henter total lengde av tabellen og trekker fra antall index cases.
  const numberOfContacts = props.numberOfCalls - props.numberOfIndexCases;
  const { error, loading, data } = useDataQuery(query);
  const filter = props.filter;

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

  // Viser bare index case boksen
  if (props.displayText === CaseEnum.INDEXES) {
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
  if (props.displayText === CaseEnum.CONTACTS) {
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
  // Viser begge boksene
  else {
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

};

export default HeaderCards;
