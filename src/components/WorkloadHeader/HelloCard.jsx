import React from "react";
import styles from "./WorkloadHeader.module.css";
import { Card } from "@dhis2/ui";
import { CovidIllustration } from "./svg/CovidIllustration.jsx";

export const HelloCard = ({ displayName, displayGreeting }) => {
  return (
    <Card className={styles.singleCard} dataTest="dhis2-uicore-card">
      <h3>{`Hello ${displayName}!`}</h3>
      <CovidIllustration />
      <p> {displayGreeting} </p>
    </Card>
  );
};

export default HelloCard;
