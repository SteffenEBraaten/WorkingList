import React, { useEffect, useState } from "react";
import { CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./Workload.module.css";
import { useDataQuery } from "@dhis2/app-runtime";
import { CaseEnum, DueDateEnum } from "../Enum/Enum";
import { WorkloadTable, toDateAndTimeFormat } from "./WorkloadTable";
import SearchComponent from "./SearchComponent";
import { findValue } from "../../api/APIUtils";

const Workload = (props) => {
  const filtered = props.indexFilterSelected;
  const caseStatus = props.statusSelected;
  const datesSelected = props.datesSelected;
  const [searchValue, setSearchValue] = useState("")

  const option = {
    variables: {
      programStatus: caseStatus,
    },
  };

  const queryContact = {
    contacts: {
      resource: "trackedEntityInstances",
      params: ({ programStatus }) => ({
        program: "DM9n1bUw8W8",
        ou: "a8QXqdXyhNr",
        fields: [
          "created",
          "orgUnit",
          "attributes",
          "trackedEntityType",
          "trackedEntityInstance",
          "relationships",
          "enrollments",
          "lastUpdated",
          "inactive",
          "events",
        ],
        programStatus: programStatus !== "ALL" ? programStatus : null,

        paging: false,
      }),
    },
  };

  const queryIndex = {
    indexCases: {
      resource: "trackedEntityInstances",
      params: ({ programStatus }) => ({
        program: "uYjxkTbwRNf",
        ou: "a8QXqdXyhNr",
        fields: [
          "created",
          "orgUnit",
          "attributes",
          "trackedEntityType",
          "trackedEntityInstance",
          "enrollments",
          "relationships",
          "lastUpdated",
          "inactive",
          "events",
        ],
        programStatus: programStatus !== "ALL" ? programStatus : null,
        paging: false,
      }),
    },
  };

  const {
    error: indexCaseError,
    loading: indexCaseLoading,
    data: indexCasesData,
    refetch: indexcaseRefetch,
  } = useDataQuery(queryIndex, option);

  const {
    error: contactCaseError,
    loading: contactCaseLoading,
    data: contactCasesData,
    refetch: contactCaseRefetch,
  } = useDataQuery(queryContact, option);

  useEffect(() => {
    async function fetchIndex() {
      await indexcaseRefetch(option.variables);
    }
    async function fetchContact() {
      await contactCaseRefetch(option.variables);
    }

    if (filtered === CaseEnum.ALL) {
      fetchIndex();
      fetchContact();
    } else if (filtered === CaseEnum.INDEXES) fetchIndex();
    else fetchContact();
  }, [filtered, caseStatus]);

  if (indexCaseLoading || contactCaseLoading) {
    return <CircularLoader className={styles.centerElement} />;
  }

  if (indexCaseError || contactCaseError) {
    return (
      <NoticeBox
        error
        title="Could not get working list"
        className={styles.centerElement}
      >
        Could not get the working list. Please try again later.
      </NoticeBox>
    );
  }

  const both = indexCasesData.indexCases.trackedEntityInstances.concat(
    contactCasesData.contacts.trackedEntityInstances
  );

  let dataToDisplay =
    filtered === CaseEnum.ALL
      ? both
      : filtered === CaseEnum.INDEXES
      ? indexCasesData.indexCases.trackedEntityInstances
      : contactCasesData.contacts.trackedEntityInstances;

  // filter data on selected date
  const filterData = (dataToDisplay) => {
    const newDataToDisplay = [];

    const from = datesSelected.from;
    const fromDate = new Date(`${from.year}`, `${from.month}`, `${from.day}`);

    const to = datesSelected.to;
    const toDate = to === null ? fromDate : new Date(`${to.year}`, `${to.month}`, `${to.day}`);

    // loop through data
    for (var i = 0; i < dataToDisplay.length; i++) {
      // loop through events
      for (var j = 0; j < dataToDisplay[i].enrollments[0].events.length; j++) {
        const event = dataToDisplay[i].enrollments[0].events[j];
        const dueDateList = toDateAndTimeFormat(event.dueDate, false).split(
          "."
        );
        const dueDate = new Date(
          dueDateList[2],
          dueDateList[1],
          dueDateList[0]
        ); // formate Date object to prepare for comparing

        if (event.status === DueDateEnum.SCHEDULE && (dueDate >= fromDate && dueDate <= toDate)){
          // filter on search bar
          if (searchValue !== "") {
            const firstName = findValue(dataToDisplay[i].attributes, "first_name").toLowerCase()
            const lastName = findValue(dataToDisplay[i].attributes, "surname").toLowerCase()
            const fullName = firstName.concat(" ", lastName)

            if (fullName.includes(searchValue)){
              newDataToDisplay.push(dataToDisplay[i])
            }
          }

          // if not user search, view full list
          else {
            newDataToDisplay.push(dataToDisplay[i])
          }
          break;
        }
      }
    }
    return newDataToDisplay;
  };

  dataToDisplay = filterData(dataToDisplay);
  props.setNumberOfCases(dataToDisplay.length);

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


  let teller = 0;
  for (var i = 0; i < dataToDisplay.length; i++) {
    if(isIndexCase(dataToDisplay[i])) teller++;
  }

  props.setNumberOfIndexCases(teller);


  return (
    <div className={styles.workloadContainer}>
      <SearchComponent setSearchValue={setSearchValue}/>
      <WorkloadTable data={dataToDisplay} />
    </div>
  );
};

export default Workload;
