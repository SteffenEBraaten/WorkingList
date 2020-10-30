import React from "react";
import styles from "./WorkloadHeader.module.css";
import { Card } from "@dhis2/ui";

export const CounterCard = ({ displayNumber, displayMessage }) => {
  return (
    <Card className={styles.singleCard} dataTest="dhis2-uicore-card">
      <div className={styles.cardContent}>
        <h1>{displayNumber}</h1>
        <p>{displayMessage}</p>
      </div>
    </Card>
  );
};

export default CounterCard;
