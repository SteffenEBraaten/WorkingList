import React from "react";
import { useConfig } from "@dhis2/app-runtime";
import { CaseEnum } from "../../../Enum/Enum";
import {
  findValue,
  toDateAndTimeFormat,
  mapProgramIdToName
} from "../../../../utils/APIUtils";
import { TableRow, TableCell, Button } from "@dhis2/ui";
import styles from "./WorkloadTable.module.css";
import DropDownStatus from "./DropDownStatus";

const goToTrackerCaptureAppBuilder = trackerCaptureURL => (
  trackedEntityInstance,
  programID,
  orgUnit
) => {
  const url = `${trackerCaptureURL}tei=${trackedEntityInstance}&program=${programID}&ou=${orgUnit}`;
  window.open(url, "_blank");
};

const WorkloadTableRows = ({ data, showContactsModal, showFilter }) => {
  const { baseUrl } = useConfig();
  const goToTrackerCaptureApp = goToTrackerCaptureAppBuilder(
    `${baseUrl}/dhis-web-tracker-capture/index.html#/dashboard?`
  );
  const isIndexCase = tei =>
    mapProgramIdToName(tei.enrollments[0].program) === "Index case";
  return data.map((item, key) =>
    item.enrollments[0].events.length > 0 ? (
      <TableRow key={key}>
        <TableCell>{mapProgramIdToName(item.enrollments[0].program)}</TableCell>
        <TableCell>{findValue(item.attributes, "first_name")}</TableCell>
        <TableCell>{findValue(item.attributes, "surname")}</TableCell>
        <TableCell>{findValue(item.attributes, "phone_local")}</TableCell>
        <TableCell>{findValue(item.attributes, "patinfo_ageonset")}</TableCell>
        <TableCell>
          {toDateAndTimeFormat(item.enrollments[0].incidentDate, false)}
        </TableCell>
        <TableCell className={styles.statusTableCell}>
          {<DropDownStatus events={item.enrollments[0].events} />}
        </TableCell>
        {showFilter !== CaseEnum.CONTACTS ? (
          <TableCell>
            {isIndexCase(item) && (
              <Button
                onClick={() =>
                  showContactsModal(
                    findValue(item.attributes, "first_name"),
                    findValue(item.attributes, "surname"),
                    item
                  )
                }
              >
                Contacts
              </Button>
            )}
          </TableCell>
        ) : null}
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
    ) : null
  );
};

export { WorkloadTableRows, goToTrackerCaptureAppBuilder };
