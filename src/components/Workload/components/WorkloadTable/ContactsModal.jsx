import React from "react";
import Relationship from "./Relationship";
import {
  Modal,
  ModalTitle,
  ModalContent,
  Table,
  TableHead,
  TableRowHead,
  TableCellHead,
  TableBody,
  Button,
  ButtonStrip,
  ModalActions,
  NoticeBox
} from "@dhis2/ui";
import styles from "./WorkloadTable.module.css";

const ContactsModal = ({ indexCase, firstName, surname, hideModal }) => {
  const indexCaseId = indexCase.trackedEntityInstance;
  const teiRelationships = indexCase.relationships;
  const numberOfContacts = teiRelationships.length;
  const modalTitle = `${firstName} ${surname}'s contacts (${numberOfContacts})`;

  return (
    <Modal className={styles.contactsModal} position="middle" id="modalContacts">
      <ModalTitle>{modalTitle}</ModalTitle>
      <ModalContent>
        {teiRelationships.length > 0 ? (
          <Table className={styles.contactModalTable}>
            <TableHead>
              <TableRowHead>
                <TableCellHead>Type</TableCellHead>
                <TableCellHead>First Name</TableCellHead>
                <TableCellHead>Last Name</TableCellHead>
                <TableCellHead>Phone Number</TableCellHead>
                <TableCellHead>Link to Tracker Capture App</TableCellHead>
              </TableRowHead>
            </TableHead>
            <TableBody>
              {teiRelationships.map((item, key) => (
                <Relationship
                  item={indexCase}
                  key={key}
                  id={item.relationship}
                  indexCaseId={indexCaseId}
                />
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
