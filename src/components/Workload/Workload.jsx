import React, { useEffect, useState } from "react";
import { CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./Workload.module.css";
import { useDataQuery } from "@dhis2/app-runtime";
import { CaseEnum, StatusEnum } from "../Enum/Enum";
import { WorkloadTable } from "./components/WorkloadTable/WorkloadTable";
import SearchComponent from "./SearchComponent";
import {
  findValue,
  isHealthScheckOrFollowUp,
  evaluateFilter,
  dueDateToDateObject,
  isWithinRange,
  toDateObject,
  mapProgramIdToName
} from "../../utils/APIUtils";

const Workload = ({
  indexFilterSelected,
  statusSelected,
  datesSelected,
  setNumberOfFollowUps,
  setNumberOfHealthChecks
}) => {
  const [searchValue, setSearchValue] = useState("");

  const option = {
    variables: {
      programStatus: statusSelected
    }
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
          "events"
        ],
        programStatus: programStatus !== CaseEnum.ALL ? programStatus : null,

        paging: false
      })
    }
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
          "events"
        ],
        programStatus: programStatus !== CaseEnum.ALL ? programStatus : null,
        paging: false
      })
    }
  };

  const {
    error: indexCaseError,
    loading: indexCaseLoading,
    data: indexCasesData,
    refetch: indexcaseRefetch
  } = useDataQuery(queryIndex, option);

  const {
    error: contactCaseError,
    loading: contactCaseLoading,
    data: contactCasesData,
    refetch: contactCaseRefetch
  } = useDataQuery(queryContact, option);

  useEffect(() => {
    async function fetchIndex() {
      await indexcaseRefetch(option.variables);
    }
    async function fetchContact() {
      await contactCaseRefetch(option.variables);
    }

    if (indexFilterSelected === CaseEnum.ALL) {
      fetchIndex();
      fetchContact();
    } else if (indexFilterSelected === CaseEnum.INDEXES) fetchIndex();
    else fetchContact();
  }, [indexFilterSelected, statusSelected]);

  const hasData = indexCasesData && contactCasesData;

  const both =
    hasData &&
    indexCasesData.indexCases.trackedEntityInstances.concat(
      contactCasesData.contacts.trackedEntityInstances
    );

  let dataToDisplay = hasData
    ? indexFilterSelected === CaseEnum.ALL
      ? both
      : indexFilterSelected === CaseEnum.INDEXES
      ? indexCasesData.indexCases.trackedEntityInstances
      : contactCasesData.contacts.trackedEntityInstances
    : [];

  // filter data on selected date
  const filterData = dataToDisplay => {
    const newDataToDisplay = [];

    const fromDate = toDateObject(
      datesSelected.from.year,
      datesSelected.from.month,
      datesSelected.from.day
    );

    const toDate = datesSelected.to
      ? toDateObject(
          datesSelected.to.year,
          datesSelected.to.month,
          datesSelected.to.day
        )
      : fromDate;

    // loop through data
    for (let i = 0; i < dataToDisplay.length; i++) {
      // loop through events
      for (let j = 0; j < dataToDisplay[i].enrollments[0].events.length; j++) {
        const event = dataToDisplay[i].enrollments[0].events[j];

        const dueDate = dueDateToDateObject(event.dueDate);

        if (isWithinRange(fromDate, toDate, dueDate)) {
          // filter on search bar
          if (searchValue !== "") {
            const firstName = findValue(
              dataToDisplay[i].attributes,
              "first_name"
            ).toLowerCase();
            const lastName = findValue(
              dataToDisplay[i].attributes,
              "surname"
            ).toLowerCase();
            const fullName = firstName.concat(" ", lastName);

            if (fullName.includes(searchValue)) {
              newDataToDisplay.push(dataToDisplay[i]);
            }
          }

          // if not user search, view full list
          else {
            newDataToDisplay.push(dataToDisplay[i]);
          }
          break;
        }
      }
    }
    return newDataToDisplay;
  };

  dataToDisplay = filterData(dataToDisplay).map(item => ({
    ...item,
    enrollments: [
      {
        ...item.enrollments[0],
        events: item.enrollments[0].events.filter(
          item =>
            isHealthScheckOrFollowUp(item.programStage) &&
            isWithinRange(
              toDateObject(
                datesSelected.from.year,
                datesSelected.from.month,
                datesSelected.from.day
              ),
              datesSelected.to
                ? toDateObject(
                    datesSelected.to.year,
                    datesSelected.to.month,
                    datesSelected.to.day
                  )
                : null,
              dueDateToDateObject(item.dueDate)
            ) &&
            evaluateFilter(item.status, statusSelected)
        )
      }
    ]
  }));

  const isIndexCase = tei =>
    mapProgramIdToName(tei.enrollments[0].program) === "Index case";

  let followUpCounter = 0;
  let healthCheckCounter = 0;
  for (let i = 0; i < dataToDisplay.length; i++) {
    for (let j = 0; j < dataToDisplay[i].enrollments[0].events.length; j++) {
      const thisEvent = dataToDisplay[i].enrollments[0].events[j];
      if (
        isIndexCase(dataToDisplay[i]) &&
        thisEvent.status !== StatusEnum.COMPLETED
      )
        healthCheckCounter++;
      if (
        !isIndexCase(dataToDisplay[i]) &&
        thisEvent.status !== StatusEnum.COMPLETED
      )
        followUpCounter++;
    }
  }

  useEffect(() => {
    setNumberOfHealthChecks(healthCheckCounter);
    setNumberOfFollowUps(followUpCounter);
  }, [healthCheckCounter, followUpCounter]);

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

  return (
    <div className={styles.workloadContainer}>
      <SearchComponent setSearchValue={setSearchValue} />
      <WorkloadTable data={dataToDisplay} showFilter={indexFilterSelected} />
    </div>
  );
};

export default Workload;
