import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { TableRow, TableCell } from "@dhis2/ui";
import { findValue } from "../../api/APIUtils";

const relationshipQuery = {
  relationship: {
    resource: "relationships",
    id: ({ id }) => id
  }
};

const Relationship = ({ id, indexCaseId }) => {
  const { loading, error, data } = useDataQuery(relationshipQuery, {
    variables: {
      id
    }
  });

  if (loading) {
    return (
      <TableRow>
        <TableCell>Loading</TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    );
  }

  const relationship = data.relationship;
  const type = relationship.relationshipName;

  const contact =
    relationship.to.trackedEntityInstance.trackedEntityInstance !== indexCaseId
      ? relationship.to
      : relationship.from;

  const firstName = findValue(
    contact.trackedEntityInstance.attributes,
    "first_name"
  );
  const surname = findValue(
    contact.trackedEntityInstance.attributes,
    "surname"
  );
  const phoneLocal = findValue(
    contact.trackedEntityInstance.attributes,
    "phone_local"
  );

  return (
    <TableRow>
      <TableCell>{type}</TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{surname}</TableCell>
      <TableCell>{phoneLocal}</TableCell>
    </TableRow>
  );
};

export default Relationship;
