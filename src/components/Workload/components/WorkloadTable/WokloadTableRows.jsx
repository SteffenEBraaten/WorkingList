import React from "react";
import { useConfig } from "@dhis2/app-runtime";
import { StatusEnum, CaseEnum } from "../../../Enum/Enum";
import {
  findValue,
  isOverdue,
  toDateAndTimeFormat,
  mapProgramIdToName,
  mapProgramStageIdToName,
} from "../../../../utils/APIUtils";
import { TableRow, TableCell, Button, Tag } from "@dhis2/ui";
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

const goToTrackerCaptureAppBuilder = (trackerCaptureURL) => (
  trackedEntityInstance,
  programID,
  orgUnit
) => {
  const url = `${trackerCaptureURL}tei=${trackedEntityInstance}&program=${programID}&ou=${orgUnit}`;
  window.open(url, "_blank");
};

export const WorkloadTableRows = ({
  data,
  showContactsModal,
  statusFilter,
  showFilter,
}) => {
  const { baseUrl } = useConfig();

  const goToTrackerCaptureApp = goToTrackerCaptureAppBuilder(
    `${baseUrl}/dhis-web-tracker-capture/index.html#/dashboard?`
  );

  const isIndexCase = (tei) =>
    mapProgramIdToName(tei.enrollments[0].program) === "Index case";

  return data.map((item, key) =>
    item.enrollments[0].events.length > 0 ? (
      <TableRow key={key}>
        <TableCell>{mapProgramIdToName(item.enrollments[0].program)}</TableCell>
        <TableCell>{findValue(item.attributes, "first_name")}</TableCell>
        <TableCell>{findValue(item.attributes, "surname")}</TableCell>
        <TableCell>{findValue(item.attributes, "phone_local")}</TableCell>
        <TableCell>{findValue(item.attributes, "patinfo_ageonset")}</TableCell>
        <TableCell>
          {toDateAndTimeFormat(item.enrollments[0].incidentDate, false)}
        </TableCell>
        <TableCell className={styles.statusTableCell}>
          {item.enrollments[0].events.map((thisEvent, key) => (
            <div key={key} className={styles.statusTagContainer}>
              <Tag {...eventTagMapper(thisEvent.status, thisEvent.dueDate)}>
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
        </TableCell>
        {showFilter !== CaseEnum.CONTACTS ? (
          <TableCell>
            {isIndexCase(item) && (
              <Button
                primary
                onClick={() =>
                  showContactsModal(
                    findValue(item.attributes, "first_name"),
                    findValue(item.attributes, "surname"),
                    item
                  )
                }
              >
                Contacts
              </Button>
            )}
          </TableCell>
        ) : null}
        <TableCell>
          <Button
            onClick={() =>
              goToTrackerCaptureApp(
                item.trackedEntityInstance,
                item.enrollments[0].program,
                item.orgUnit
              )
            }
          >
            Tracker Capture App
          </Button>
        </TableCell>
      </TableRow>
    ) : null
  );
};
