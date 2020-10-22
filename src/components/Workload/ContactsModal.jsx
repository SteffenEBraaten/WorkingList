import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
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
  CircularLoader,
  NoticeBox,
} from "@dhis2/ui";

const queryContact = {
  contacts: {
    resource: "trackedEntityInstances",
    params: ({ trackedEntityInstance }) => ({
      program: "DM9n1bUw8W8",
      trackedEntityInstance: trackedEntityInstance,
      ou: "a8QXqdXyhNr",
      fields: ["attributes", "relationships", "enrollments"],
      paging: false,
    }),
  },
};

const filterContacts = (contacts, relationshipEntityInstance) => {
  // kom ikke på bedre løsning, filtrer slik at trackedentetyinstance er same
  const tempFiltered = [];

  contacts.map((item) => {
    if (item.relationships.length !== 0) {
      if (
        item.relationships[0].to.trackedEntityInstance.trackedEntityInstance ===
        relationshipEntityInstance
      ) {
        tempFiltered.push(item);
      }
    }
  });
  return tempFiltered;
};

const ContactsModal = (props) => {
  const relationshipEntityInstance = props.item.relationshipEntityInstance;

  const option = {
    variables: {
      programStatus: relationshipEntityInstance,
    },
  };

  const {
    error: contactCaseError,
    loading: contactCaseLoading,
    data: contactCasesData,
  } = useDataQuery(queryContact, option);

  if (contactCaseError) {
    return (
      <NoticeBox
        error
        title="Could not get contact modal"
        className={styles.centerElement}
      >
        Could not get the contact list for this index case. Please try again
        later.
      </NoticeBox>
    );
  }
  if (contactCaseLoading) {
    return <p></p>;
  }
  /*
  useEffect(() => {
    const tempFiltered = [];
    contactCasesData.map((item) => {
      if (item.relationships.length !== 0) {
        if (
          item.relationships[0].to.trackedEntityInstance
            .trackedEntityInstance === relationshipEntityInstance
        ) {
          tempFiltered.push(item);
        }
      }
    });
    console.log(tempFiltered);
  }, [relationshipEntityInstance]);

  
  if (contactCaseLoading) {
    return <CircularLoader className={styles.centerElement} />;
  }
  */

  const listContacts = filterContacts(
    contactCasesData.contacts.trackedEntityInstances,
    relationshipEntityInstance
  );

  const numberOfContacts = listContacts.length;
  let titleOfContacts = `${props.item.first_name} ${props.item.surname}'s contacts (${numberOfContacts}) `;
  /*let titleOfContacts = JSON.stringify(
    props.item.first_name +
      " " +
      props.item.surname +
      "'s contacts" +
      " (" +
      numberOfContacts +
      ")"
  );
  titleOfContacts = titleOfContacts.substring(1, titleOfContacts.length - 1);*/

  return (
    <Modal dataTest="dhis2-uicore-modal" position="middle" id="modalContacts">
      <ModalTitle dataTest="dhis2-uicore-modaltitle">
        {titleOfContacts}
      </ModalTitle>
      <ModalContent dataTest="dhis2-uicore-modalcontent">
        <Table>
          <TableHead>
            <TableRowHead>
              <TableCellHead>Type</TableCellHead>
              <TableCellHead>First Name</TableCellHead>
              <TableCellHead>Last Name</TableCellHead>
              <TableCellHead>Phone Number</TableCellHead>
              <TableCellHead>Status</TableCellHead>
            </TableRowHead>
          </TableHead>
          <TableBody>
            {listContacts.map((item, key) => (
              <TableRow key={key}>
                <TableCell>Contact</TableCell>
                <TableCell>
                  {findValue(item.attributes, "first_name")}
                </TableCell>
                <TableCell>{findValue(item.attributes, "surname")}</TableCell>
                <TableCell>
                  {findValue(item.attributes, "phone_local")}
                </TableCell>
                <TableCell>{item.enrollments[0].status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ModalContent>
      <ModalActions dataTest="dhis2-uicore-modalactions">
        <ButtonStrip dataTest="dhis2-uicore-buttonstrip" end>
          <Button
            data-dismiss="modalContacts"
            dataTest="dhis2-uicore-button"
            primary
            type="button"
            onClick={() => props.item.hideModal(false)}
          >
            Cancel
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
};

export default ContactsModal;
