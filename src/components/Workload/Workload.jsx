import React, { useEffect, useState } from "react";
import { CircularLoader, NoticeBox } from "@dhis2/ui";
import styles from "./Workload.module.css";
import { useDataQuery } from "@dhis2/app-runtime";
import { CaseEnum, StatusEnum } from "../Enum/Enum";
import WorkloadTable from "./components/WorkloadTable/WorkloadTable";
import { retrieveLocalStorage } from "./ProgramToLocalStorage";
import {
  findValue,
  isHealthScheckOrFollowUp,
  evaluateFilter,
  dueDateToDateObject,
  isWithinRange,
  toDateObject,
  mapProgramIdToName,
  isOverdue,
  dateIsToday,
  sortEventsOnDate
} from "../../utils/APIUtils";
import commonStyles from "../../App.module.css";

const Workload = ({
  indexFilterSelected,
  statusSelected,
  datesSelected,
  setNumberOfFollowUps,
  setNumberOfHealthChecks,
  orgUnit,
  searchValue
}) => {
  const queryContact = {
    contacts: {
      resource: "trackedEntityInstances",
      params: ({ organisationUnit }) => ({
        program: `${retrieveLocalStorage("programs", CaseEnum.CONTACTS).id}`,
        ou: `${organisationUnit}`,
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
        paging: false
      })
    }
  };

  const queryIndex = {
    indexCases: {
      resource: "trackedEntityInstances",
      params: ({ organisationUnit }) => ({
        program: `${retrieveLocalStorage("programs", CaseEnum.INDEXES).id}`,
        ou: `${organisationUnit}`,
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
        paging: false
      })
    }
  };

  const {
    error: indexCaseError,
    loading: indexCaseLoading,
    data: indexCasesData,
    refetch: indexcaseRefetch
  } = useDataQuery(queryIndex, {
    variables: { organisationUnit: orgUnit }
  });

  const {
    error: contactCaseError,
    loading: contactCaseLoading,
    data: contactCasesData,
    refetch: contactCaseRefetch
  } = useDataQuery(queryContact, {
    variables: { organisationUnit: orgUnit }
  });

  useEffect(() => {
    async function fetchIndex() {
      await indexcaseRefetch({ organisationUnit: orgUnit });
    }
    async function fetchContact() {
      await contactCaseRefetch({ organisationUnit: orgUnit });
    }

    if (indexFilterSelected === CaseEnum.ALL) {
      fetchIndex();
      fetchContact();
    } else if (indexFilterSelected === CaseEnum.INDEXES) fetchIndex();
    else fetchContact();
  }, [indexFilterSelected, orgUnit]);

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
  // filter data on selected date
  const selectedDateIsToday = dateIsToday(fromDate, toDate);

  const filterData = dataToDisplay => {
    const newDataToDisplay = [];
    // loop through data
    for (let i = 0; i < dataToDisplay.length; i++) {
      // loop through events
      for (let j = 0; j < dataToDisplay[i].enrollments[0].events.length; j++) {
        const event = dataToDisplay[i].enrollments[0].events[j];
        const dueDate = dueDateToDateObject(event.dueDate);
        if (isWithinRange(fromDate, toDate, dueDate) || (isOverdue(dueDate, event.status) && selectedDateIsToday)) {
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


  // TODOS: Getting duplicate cases becuse of how the enrollemnts events filter is writen here.
  dataToDisplay = filterData(dataToDisplay).map(item => ({
    ...item,
    enrollments: [
      {
        ...item.enrollments[0],
        events: item.enrollments[0].events.filter(
          item =>
            isHealthScheckOrFollowUp(item.programStage) &&
            (selectedDateIsToday ? // if selected date is today
              (isOverdue(item.dueDate, item.status) || // then we take events that are overdue or events that are within range
                (isWithinRange(fromDate, toDate, dueDateToDateObject(item.dueDate)) &&
                  dateIsToday(item.dueDate)))
              : // else filter only events that are within range
              (isWithinRange(fromDate, toDate, dueDateToDateObject(item.dueDate))
              ))
            && evaluateFilter(item.status, statusSelected)
        )
      }
    ]
  })).filter(item => item.enrollments[0].events.length > 0)


  if (selectedDateIsToday) {
    dataToDisplay = dataToDisplay.sort((a, b) => {
      const sortedAEvents = sortEventsOnDate(a.enrollments[0].events);
      const sortedBEvents = sortEventsOnDate(b.enrollments[0].events);
      const sortedAlast = sortedAEvents[sortedAEvents.length - 1];
      const sortedBlast = sortedBEvents[sortedBEvents.length - 1];
      return sortedAlast.dueDate.localeCompare(sortedBlast.dueDate)
    });
  }
  const isIndexCase = tei =>
    mapProgramIdToName(tei.enrollments[0].program) ===
    "Index case surveillance";

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
    return <CircularLoader className={commonStyles.centerElement} />;
  }

  if (indexCaseError || contactCaseError) {
    return (
      <NoticeBox
        error
        title="Could not get working list"
        className={commonStyles.centerElement}
      >
        Could not get the working list. Please try again later.
      </NoticeBox>
    );
  }

  return (
    <div className={styles.workloadContainer}>
      <WorkloadTable data={dataToDisplay} showFilter={indexFilterSelected} />
    </div>
  );
};

export default Workload;
