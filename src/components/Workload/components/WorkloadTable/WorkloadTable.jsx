import React, { useState } from "react";
import { CaseEnum, StatusEnum } from "../../../Enum/Enum";
import {
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
  NoticeBox,
  Button,
  Tag,
} from "@dhis2/ui";
import { evaluateFilter } from "../../../../utils/APIUtils";
import ContactsModal from "./ContactsModal.jsx";
import styles from "./WorkloadTable.module.css";
import {
  toDateAndTimeFormat,
  mapProgramIDToName,
  toDateObject,
  dueDateToDateObject,
} from "../../../../utils/MapperUtils";
import {
  isWithinRange,
  isHealthScheckOrFollowUp,
} from "../../../../utils/APIUtils";
import { WorkloadTableRows } from "./WokloadTableRows";

const WorkloadTable = ({ data, dates, showFilter, statusFilter }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalObject, setObject] = useState({});

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

  const filteredData = data.map((item) => ({
    ...item,
    enrollments: [
      {
        ...item.enrollments[0],
        events: item.enrollments[0].events.filter(
          (item) =>
            isHealthScheckOrFollowUp(item.programStage) &&
            isWithinRange(
              toDateObject(dates.from.year, dates.from.month, dates.from.day),
              dates.to
                ? toDateObject(dates.to.year, dates.to.month, dates.to.day)
                : null,
              dueDateToDateObject(item.dueDate)
            ) &&
            evaluateFilter(item.status, statusFilter)
        ),
      },
    ],
  }));

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
              <TableCellHead>Status</TableCellHead>
              {showFilter !== CaseEnum.CONTACTS ? (
                <TableCellHead>Contacts</TableCellHead>
              ) : null}
              <TableCellHead>Link to Tracker Capture App</TableCellHead>
            </TableRowHead>
          </TableHead>
          <TableBody>
            <WorkloadTableRows
              data={filteredData}
              showContactsModal={showContactsModal}
              showFilter={showFilter}
              statusFilter={statusFilter}
            />
          </TableBody>
        </Table>
      ) : (
        <NoticeBox className={styles.noticeAllDone}>
          No heath checks or follow-up calls for today!
        </NoticeBox>
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
