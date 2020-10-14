import React from "react";
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

const WorkloadTable = ({ data }, props) => {
  return (
    (props.statusSelected === "ALL" || data.caseStatus == props.statusSelected) &&
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
          <TableCellHead>Link to Tracker Capture App</TableCellHead>
        </TableRowHead>
      </TableHead>
      <TableBody>
        {data.map((dataEntry, key) => (
          <TableRow key={key}>
            <TableCell>{mapProgramIDToName(dataEntry.programID)}</TableCell>
            <TableCell>{dataEntry.firstName}</TableCell>
            <TableCell>{dataEntry.lastName}</TableCell>
            <TableCell>{dataEntry.phoneNumber}</TableCell>
            <TableCell>{dataEntry.age}</TableCell>
            <TableCell>
              {toDateAndTimeFormat(dataEntry.incidentDate, false)}
            </TableCell>
            <TableCell>{toDateAndTimeFormat(dataEntry.lastUpdated)}</TableCell>
            <TableCell>
              <Button
                primary
                onClick={() =>
                  goToTrackerCaptureApp(
                    dataEntry.trackedEntityInstance,
                    dataEntry.programID,
                    dataEntry.orgUnit
                  )
                }
              >
                Go to Tracker Capture App!
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  );
};

export default WorkloadTable;
