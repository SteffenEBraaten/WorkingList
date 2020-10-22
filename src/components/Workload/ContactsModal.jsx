import React, { useState, useEffect } from "react";
import Relationship from "./Relationship";
import { findValue } from "../../api/APIUtils";
import styles from "./Workload.module.css";
import {
  Modal,
  ModalTitle,
  ModalContent,
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ButtonStrip,
  ModalActions,
  CenteredContent,
  CircularLoader,
  NoticeBox,
} from "@dhis2/ui";

const ContactsModal = ({ indexCase, firstName, surname, hideModal }) => {
  const indexCaseId = indexCase.trackedEntityInstance;
  const teiEnrollments = indexCase.enrollments;
  const teiAttributes = indexCase.attributes;
  const teiRelationships = indexCase.relationships;
  const numberOfContacts = teiRelationships.length;
  const modalTitle = `${firstName} ${surname}'s contacts (${numberOfContacts})`;

  return (
    <Modal position="middle" id="modalContacts">
      <ModalTitle>{modalTitle}</ModalTitle>
      <ModalContent>
        {teiRelationships.length > 0 ? (
          <Table>
            <TableHead>
              <TableRowHead>
                <TableCellHead>Type</TableCellHead>
                <TableCellHead>First Name</TableCellHead>
                <TableCellHead>Last Name</TableCellHead>
                <TableCellHead>Phone Number</TableCellHead>
              </TableRowHead>
            </TableHead>
            <TableBody>
              {teiRelationships.map((item, key) => (
                <Relationship key={key} id={item.relationship} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoticeBox>This index case has no contacts</NoticeBox>
        )}
      </ModalContent>
      <ModalActions>
        <ButtonStrip end>
          <Button
            data-dismiss="modalContacts"
            type="button"
            onClick={hideModal}
          >
            Cancel
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
};

export default ContactsModal;
