import React, { useState } from "react";
import { useConfig } from "@dhis2/app-runtime";
import {
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tag,
} from "@dhis2/ui";
import { findValue, isOverdue } from "../../utils/APIUtils";
import { StatusEnum } from "../Enum/Enum";
import ContactsModal from "./ContactsModal.jsx";
import styles from "./WorkloadTable.module.css";
import {
  toDateAndTimeFormat,
  mapProgramIDToName,
  toDateObject,
  dueDateToDateObject,
} from "../../utils/MapperUtils";
import { isWithinRange } from "../../utils/APIUtils";

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

const isIndexCase = (tei) =>
  mapProgramIDToName(tei.enrollments[0].program) === "Index case";

const goToTrackerCaptureAppBuilder = (trackerCaptureURL) => (
  trackedEntityInstance,
  programID,
  orgUnit
) => {
  const url = `${trackerCaptureURL}tei=${trackedEntityInstance}&program=${programID}&ou=${orgUnit}`;
  window.open(url, "_blank");
};

const WorkloadTable = ({ data, dates }) => {
  const { baseUrl } = useConfig();
  const [showModal, setShowModal] = useState(false);
  const [modalObject, setObject] = useState({});

  const goToTrackerCaptureApp = goToTrackerCaptureAppBuilder(
    `${baseUrl}/dhis-web-tracker-capture/index.html#/dashboard?`
  );

  const showContactsModal = (
    firstName,
    surname,
    trackedEntityInstance,
    hideModal
  ) => {
    setObject({
      firstName,
      surname,
      trackedEntityInstance,
    });
    setShowModal(true);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>Type</TableCellHead>
            <TableCellHead>First Name</TableCellHead>
            <TableCellHead>Last Name</TableCellHead>
            <TableCellHead>Phone Number</TableCellHead>
            <TableCellHead>Age</TableCellHead>
            <TableCellHead>Incident Date</TableCellHead>
            <TableCellHead>Last updated</TableCellHead>
            <TableCellHead>Status</TableCellHead>
            <TableCellHead>Contacts</TableCellHead>
            <TableCellHead>Link to Tracker Capture App</TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody>
          {data.map((item, key) => (
            <TableRow key={key}>
              <TableCell>
                {mapProgramIDToName(item.enrollments[0].program)}
              </TableCell>
              <TableCell>{findValue(item.attributes, "first_name")}</TableCell>
              <TableCell>{findValue(item.attributes, "surname")}</TableCell>
              <TableCell>{findValue(item.attributes, "phone_local")}</TableCell>
              <TableCell>
                {findValue(item.attributes, "patinfo_ageonset")}
              </TableCell>
              <TableCell>
                {toDateAndTimeFormat(item.enrollments[0].incidentDate, false)}
              </TableCell>
              <TableCell>{toDateAndTimeFormat(item.lastUpdated)}</TableCell>
              <TableCell className={styles.statusTableCell}>
                {item.enrollments[0].events.map((thisEvent, key) =>
                  isWithinRange(
                    toDateObject(
                      dates.from.year,
                      dates.from.month,
                      dates.from.day
                    ),
                    dates.to
                      ? toDateObject(
                          dates.to.year,
                          dates.to.month,
                          dates.to.day
                        )
                      : null,
                    dueDateToDateObject(thisEvent.dueDate)
                  ) ? (
                    <div key={key} className={styles.statusTagContainer}>
                      <Tag
                        {...eventTagMapper(thisEvent.status, thisEvent.dueDate)}
                      >
                        {`${toDateAndTimeFormat(thisEvent.dueDate, false)} ${
                          isOverdue(thisEvent.dueDate) &&
                          thisEvent.status === StatusEnum.SCHEDULE
                            ? StatusEnum.OVERDUE
                            : thisEvent.status
                        }`}
                      </Tag>
                    </div>
                  ) : null
                )}
              </TableCell>
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
                    See contacts
                  </Button>
                )}
              </TableCell>
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
          ))}
        </TableBody>
      </Table>
      {showModal && (
        <ContactsModal
          indexCase={modalObject.trackedEntityInstance}
          firstName={modalObject.firstName}
          surname={modalObject.surname}
          hideModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export { WorkloadTable, toDateAndTimeFormat };
