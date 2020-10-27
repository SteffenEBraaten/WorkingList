import React, { useState } from "react";
import { useConfig } from "@dhis2/app-runtime";
import styles from "./Workload.module.css";
import { CaseEnum } from "../Enum/Enum";
import {
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
  NoticeBox,
  Button
} from "@dhis2/ui";
import { findValue } from "../../api/APIUtils";
import ContactsModal from "./ContactsModal.jsx";

const toDateAndTimeFormat = (dateString, time = true) => {
  const date = time
    ? new Date(dateString).toLocaleString("no")
    : new Date(dateString).toLocaleDateString("no");
  return date;
};

const programDictonary = {
  uYjxkTbwRNf: "Index case",
  DM9n1bUw8W8: "Contact"
};

const mapProgramIDToName = programID => {
  const name = programDictonary[programID]
    ? programDictonary[programID]
    : programID;
  return name;
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

const WorkloadTable = ({ data, filter }) => {
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
    {data.length > 0 ? (
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
            {filter !== CaseEnum.CONTACTS ? (
            <TableCellHead>Contacts</TableCellHead>
            ) : (<></>)}
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
              <TableCell>{item.enrollments[0].status}</TableCell>
              {filter !== CaseEnum.CONTACTS ? (
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
              ) : (<></>)}
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
      ) : (
          <NoticeBox className={styles.noticeAllDone}>No heath checks or follow-up calls for today!</NoticeBox>
      )}
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
