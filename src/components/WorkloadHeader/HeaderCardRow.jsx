import React from "react";
import styles from "./WorkloadHeader.module.css";
import { CircularLoader, NoticeBox } from "@dhis2/ui";
import { CaseEnum } from "../Enum/Enum";
import { CounterCard } from "./CounterCard.jsx";
import { HelloCard } from "./HelloCard.jsx";
import { useUser } from "./UserContext";
import commonStyles from "../../App.module.css";

const HeaderCardRow = ({
  numberOfFollowUps,
  numberOfHealthChecks,
  displayText,
}) => {
  const user = useUser();

  //Her kan vi endre på meldingene som skal vises til brukere
  const displayMessageHealthchecks = "Health checks that needs to be performed";
  const displayMessageContacts = "Contacts that needs to be contacted";
  const displayMessageGreeting = "Keep up the good work!";

  const helloCard = user.data ? (
    <HelloCard
      displayGreeting={displayMessageGreeting}
      displayName={user.data.me.firstName}
    />
  ) : user.error ? (
    <NoticeBox
      error
      title="Could not get the name of the user"
      className={commonStyles.centerElement}
    >
      Could not get the name of the user. Please try again later.
    </NoticeBox>
  ) : user.loading ? (
    <CircularLoader />
  ) : null;

  //Resten blir hentet fra CounterCards som tar inn displayMessage og displayNumber som paramenter
  if (displayText === CaseEnum.INDEXES) {
    return (
      <div className={styles.cardRow}>
        {helloCard}
        <CounterCard
          displayMessage={displayMessageHealthchecks}
          displayNumber={numberOfHealthChecks}
        />
      </div>
    );
  }

  if (displayText === CaseEnum.CONTACTS) {
    return (
      <div className={styles.cardRow}>
        {helloCard}
        <CounterCard
          displayMessage={displayMessageContacts}
          displayNumber={numberOfFollowUps}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.cardRow}>
        {helloCard}
        <CounterCard
          displayMessage={displayMessageHealthchecks}
          displayNumber={numberOfHealthChecks}
        />
        <CounterCard
          displayMessage={displayMessageContacts}
          displayNumber={numberOfFollowUps}
        />
      </div>
    );
  }
};

export default HeaderCardRow;
