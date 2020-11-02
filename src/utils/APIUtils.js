import { StatusEnum, CaseEnum } from "../components/Enum/Enum.jsx";
import { retrieveLocalStorage } from "../components/Workload/ProgramToLocalStorage";

const findValue = (listToSearch, code) => {
  return listToSearch.find((item) => item.code === code)
    ? listToSearch.find((item) => item.code === code).value
    : "N/A";
};

let programStageDictionary = {};
let programDictionary = {};


const retrieveProgramStage = () => {
  const programStageIndex = retrieveLocalStorage("programStages", CaseEnum.INDEXES)
  const programStageContact = retrieveLocalStorage("programStages", CaseEnum.CONTACTS)

  programStageDictionary = {
    [programStageIndex.id]: programStageIndex.displayName,
    [programStageContact.id]: programStageContact.displayName,
  };
}

const retrieveProgram = () => {
  const programIndex = retrieveLocalStorage("programs", CaseEnum.INDEXES)
  const programContact = retrieveLocalStorage("programs", CaseEnum.CONTACTS)
  programDictionary = {
    [programIndex.id]: programIndex.displayName,
    [programContact.id]: programContact.displayName,
  };

}

const mapProgramStageIdToName = (programStageId) => {
  const name = programStageDictionary[programStageId]
    ? programStageDictionary[programStageId]
    : programStageId;
  return name;
};

const isHealthScheckOrFollowUp = (programStage) => {
  return programStageDictionary[programStage] ? true : false;
};
const dateIsToday = (fromDate, toDate) => {
  const today = new Date();
  const fromDateFormatted = new Date(fromDate);
  const toDateFormatted = toDate ? new Date(toDate) : fromDateFormatted;
  return today.toDateString() == fromDateFormatted.toDateString() && fromDateFormatted.toDateString() === toDateFormatted.toDateString();

}
const isOverdue = (dueDate, eventStatus) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDateFormatted = new Date(dueDate);
  return (today > dueDateFormatted) && (eventStatus === StatusEnum.SCHEDULE || eventStatus === StatusEnum.ACTIVE);
};
const sortEventsOnDate = (eventsToSort) => {
  const sortedEvents = eventsToSort.sort(function (first, second) {
    return first.dueDate.localeCompare(second.dueDate)
  });
  return sortedEvents;
}
const isWithinRange = (fromDate, toDate, dueDate) => {
  const dueDateFormatted = new Date(dueDate);
  const fromDateFormatted = new Date(fromDate);
  const toDateFormatted = toDate ? new Date(toDate) : fromDateFormatted;

  return (
    dueDateFormatted >= fromDateFormatted && dueDateFormatted <= toDateFormatted
  );
};

const evaluateFilter = (eventStatus, filterStatus) => {
  return filterStatus === StatusEnum.ALL
    ? true
    : filterStatus === StatusEnum.ACTIVE
      ? (eventStatus !== StatusEnum.COMPLETED || eventStatus !== StatusEnum.SKIPPED)
        ? true
        : false
      : filterStatus === StatusEnum.COMPLETED
        ? (eventStatus === StatusEnum.COMPLETED || eventStatus === StatusEnum.SKIPPED)
          ? true
          : false
        : false;
};

const toDateAndTimeFormat = (dateString, time = true) => {
  const date = time
    ? new Date(dateString).toLocaleString("no")
    : new Date(dateString).toLocaleDateString("no");
  return date;
};


const mapProgramIdToName = (programID) => {
  const name = programDictionary[programID]
    ? programDictionary[programID]
    : programID;

  return name;
};

const toDateObject = (year, month, day) => {
  const date = new Date(`${year}-${month}-${day}`);
  return date;
};

const dueDateToDateObject = (dueDate) => {
  const dueDateList = new Date(dueDate).toLocaleDateString("no").split(".");
  return toDateObject(dueDateList[2], dueDateList[1], dueDateList[0]);
};

export {
  findValue,
  isOverdue,
  dateIsToday,
  isWithinRange,
  isHealthScheckOrFollowUp,
  evaluateFilter,
  mapProgramStageIdToName,
  toDateAndTimeFormat,
  mapProgramIdToName,
  toDateObject,
  dueDateToDateObject,
  retrieveProgram,
  retrieveProgramStage,
  sortEventsOnDate
};
