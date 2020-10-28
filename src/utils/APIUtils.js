import React, { useEffect } from "react";
import { StatusEnum, CaseEnum } from "../components/Enum/Enum.jsx";
import { retrieveLocalStorage } from "../components/Workload/ProgramToLocalStorage";
import { DoLocalStorage } from "../components/Workload/ProgramToLocalStorage";

export const findValue = (listToSearch, code) => {
  return listToSearch.find((item) => item.code === code)
    ? listToSearch.find((item) => item.code === code).value
    : "N/A";
};

console.log("kommer inn i APIUTILS");

/*const programStageIndex = retrieveLocalStorage("programStages", CaseEnum.INDEXES)
const programStageContact = retrieveLocalStorage("programStages", CaseEnum.CONTACTS)

const programStageDictonary = {
  [programStageIndex.id]: programStageIndex.displayName,
  [programStageContact.id]: programStageContact.displayName,
};


console.log(programStageDictonary)*/
 const programStageDictonary = {
  oqsk2Jv4k3s: "Health status",
  sAV9jAajr8x: "Follow-up",
}; 

export const mapProgramStageIdToName = (programStageId) => {
  const name = programStageDictonary[programStageId]
    ? programStageDictonary[programStageId]
    : programStageId;
  return name;
};

export const isHealthScheckOrFollowUp = (programStage) => {
  return programStageDictonary[programStage] ? true : false;
};

export const isOverdue = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDateFormatted = new Date(dueDate);
  return today > dueDateFormatted;
};

export const isWithinRange = (fromDate, toDate, dueDate) => {
  const dueDateFormatted = new Date(dueDate);
  const fromDateFormatted = new Date(fromDate);
  const toDateFormatted = toDate ? new Date(toDate) : fromDateFormatted;

  return (
    dueDateFormatted >= fromDateFormatted && dueDateFormatted <= toDateFormatted
  );
};

export const evaluateFilter = (eventStatus, filterStatus) => {
  return filterStatus === StatusEnum.ALL
    ? true
    : filterStatus === StatusEnum.ACTIVE
    ? eventStatus !== StatusEnum.COMPLETED
      ? true
      : false
    : filterStatus === StatusEnum.COMPLETED
    ? eventStatus === StatusEnum.COMPLETED
      ? true
      : false
    : false;
};

export const toDateAndTimeFormat = (dateString, time = true) => {
  const date = time
    ? new Date(dateString).toLocaleString("no")
    : new Date(dateString).toLocaleDateString("no");
  return date;
};

/* 
const programIndex = retrieveLocalStorage("programs", CaseEnum.INDEXES)
const programContact = retrieveLocalStorage("programs", CaseEnum.CONTACTS) 

const programDictonary = {
  [programIndex.id]: programIndex.displayName,
  [programContact.id]: programContact.displayName,
};

*/

const programDictonary = {
  uYjxkTbwRNf: "Index case",
  DM9n1bUw8W8: "Contact",
};

export const mapProgramIdToName = (programID) => {
  const name = programDictonary[programID]
    ? programDictonary[programID]
    : programID;
  return name;
};

export const toDateObject = (year, month, day) => {
  const date = new Date(`${year}-${month}-${day}`);
  return date;
};

export const dueDateToDateObject = (dueDate) => {
  const dueDateList = new Date(dueDate).toLocaleDateString("no").split(".");
  return toDateObject(dueDateList[2], dueDateList[1], dueDateList[0]);
};

export default {
  findValue,
  isOverdue,
  isWithinRange,
  isHealthScheckOrFollowUp,
  evaluateFilter,
  mapProgramStageIdToName,
  toDateAndTimeFormat,
  mapProgramIdToName,
  toDateObject,
  dueDateToDateObject,
};
