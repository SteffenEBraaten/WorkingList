import React from "react";
import { StatusEnum } from "../../../Enum/Enum";
import {
  isOverdue,
  toDateAndTimeFormat,
  mapProgramStageIdToName
} from "../../../../utils/APIUtils";
import { Tag, DropdownButton, Card, NoticeBox } from "@dhis2/ui";
import styles from "./WorkloadTable.module.css";

const eventTagMapper = (eventStatus, eventDueDate) => {
  if (
    (eventStatus === StatusEnum.SCHEDULE && isOverdue(eventDueDate)) ||
    eventStatus === StatusEnum.OVERDUE
  ) {
    return { negative: true };
  }
  if (eventStatus === StatusEnum.SCHEDULE) {
    return { neutral: true };
  }
  if (eventStatus === StatusEnum.COMPLETED) {
    return { positive: true };
  } else return {};
};

const sortEventsOnDate = (eventsToSort) => {
  const sortedEvents = eventsToSort.sort(function(first, second) {
    return first.dueDate.localeCompare(second.dueDate)
  });
  return sortedEvents;
}


const DropDownStatus = ({ events }) => {
  const sortedEvents = sortEventsOnDate(events)
  const lastEvent = sortedEvents[sortedEvents.length - 1];
  const prevEvents = sortedEvents.slice(0, -1);
  return (
    <DropdownButton
      className={styles.dropDownStatus}
      component={
        <Card className={styles.dropDownStatusCard}>
          <p>Previous events</p>
          {prevEvents.length === 0 ? <NoticeBox>No events</NoticeBox> : null}
          {prevEvents.map((thisEvent, key) => (
            <div key={key} className={styles.dropDownStatusContainer}>
              <Tag
                className={styles.dropDownStatusTag}
                {...eventTagMapper(thisEvent.status, thisEvent.dueDate)}
              >
                {`${toDateAndTimeFormat(
                  thisEvent.dueDate,
                  false
                )} ${mapProgramStageIdToName(thisEvent.programStage)} ${
                  isOverdue(thisEvent.dueDate) &&
                  thisEvent.status === StatusEnum.SCHEDULE
                    ? StatusEnum.OVERDUE
                    : thisEvent.status
                }`}
              </Tag>
            </div>
          ))}
        </Card>
      }
      dataTest="dhis2-uicore-dropdownbutton"
      name="default"
      value="nothing"
    >
      <div className={styles.dropDownWrapTag}>
        <Tag
          className={styles.dropDownStatusTag}
          {...eventTagMapper(lastEvent.status, lastEvent.dueDate)}
        >
          {`${toDateAndTimeFormat(
            lastEvent.dueDate,
            false
          )} ${mapProgramStageIdToName(lastEvent.programStage)} ${
            isOverdue(lastEvent.dueDate) &&
            lastEvent.status === StatusEnum.SCHEDULE
              ? StatusEnum.OVERDUE
              : lastEvent.status
          }`}
        </Tag>
      </div>
    </DropdownButton>
  );
};
export default DropDownStatus;
