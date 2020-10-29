import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { TableRow, TableCell, Button } from "@dhis2/ui";
import { findValue } from "../../../../utils/APIUtils";
import { useConfig } from "@dhis2/app-runtime";
import { goToTrackerCaptureAppBuilder } from "./WokloadTableRows";

const relationshipQuery = {
  relationship: {
    resource: "relationships",
    id: ({ id }) => id
  }
};

const Relationship = ({ id, indexCaseId, item }) => {
  const { baseUrl } = useConfig();
  const goToTrackerCaptureApp = goToTrackerCaptureAppBuilder(
    `${baseUrl}/dhis-web-tracker-capture/index.html#/dashboard?`
  );
  
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
          Tracker Capture App
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Relationship;
