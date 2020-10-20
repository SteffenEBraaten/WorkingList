import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@dhis2/ui";
import trackerCaptureURL from "../../api/Urls";
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
  DM9n1bUw8W8: "Contact",
};

const mapProgramIDToName = (programID) => {
  const name = programDictonary[programID]
    ? programDictonary[programID]
    : programID;
  return name;
};

const goToTrackerCaptureApp = (trackedEntityInstance, programID, orgUnit) => {
  setTimeout(function () {
    window.open(
      `${trackerCaptureURL}tei=${trackedEntityInstance}&program=${programID}&ou=${orgUnit}`,
      "_blank"
    );
  }, 200);
};

const WorkloadTable = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalObject, setObject] = useState({});
  const showContactsModal = (
    program,
    first_name,
    surname,
    relationshipEntityInstance,
    hideModal
  ) => {
    let entityInstance = relationshipEntityInstance;
    if (program == "Index case") {
      if (relationshipEntityInstance.length != 0) {
        entityInstance =
          relationshipEntityInstance[0].to.trackedEntityInstance
            .trackedEntityInstance;
      }

      setObject({
        first_name: first_name,
        surname: surname,
        relationshipEntityInstance: entityInstance,
        hideModal: hideModal,
      });
      setShowModal(true);
    }
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
              <TableCell>{item.enrollments[0].status}</TableCell>
              <TableCell>
                <Button
                  primary
                  onClick={() =>
                    showContactsModal(
                      mapProgramIDToName(item.enrollments[0].program),
                      findValue(item.attributes, "first_name"),
                      findValue(item.attributes, "surname"),
                      item.relationships,
                      setShowModal
                    )
                  }
                >
                  See contacts
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  primary
                  onClick={() =>
                    goToTrackerCaptureApp(
                      item.trackedEntityInstance,
                      item.enrollments[0].program,
                      item.orgUnit
                    )
                  }
                >
                  Go to Tracker Capture App!
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showModal && <ContactsModal item={modalObject} />}
    </>
  );
};

export { WorkloadTable, toDateAndTimeFormat };
