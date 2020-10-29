import React, { useState , useEffect} from "react";
import { StatusEnum, CaseEnum } from "../components/Enum/Enum.jsx";
import { retrieveLocalStorage } from "../components/Workload/ProgramToLocalStorage";
const findValue = (listToSearch, code) => {
  return listToSearch.find((item) => item.code === code)
  ? listToSearch.find((item) => item.code === code).value
  : "N/A";
};

let programStageDictionary = {};
let programDictionary = {};


const RetrieveProgramStage = () => {
  const programStageIndex = retrieveLocalStorage("programStages", CaseEnum.INDEXES)
  const programStageContact = retrieveLocalStorage("programStages", CaseEnum.CONTACTS)
  
  programStageDictionary = {
    [programStageIndex.id]: programStageIndex.displayName,
    [programStageContact.id]: programStageContact.displayName,
  };
  return null;
}

const RetrieveProgram = () => {
  const programIndex = retrieveLocalStorage("programs", CaseEnum.INDEXES)
  const programContact = retrieveLocalStorage("programs", CaseEnum.CONTACTS) 
  
  programDictionary = {
    [programIndex.id]: programIndex.displayName,
    [programContact.id]: programContact.displayName,
  };
  
}

export const mapProgramStageIdToName = (programStageId) => {
  const name = programStageDictionary[programStageId]
    ? programStageDictionary[programStageId]
    : programStageId;
  return name;
};

export const isHealthScheckOrFollowUp = (programStage) => {
  return programStageDictionary[programStage] ? true : false;
};

export const isOverdue = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDateFormatted = new Date(dueDate);
  return today > dueDateFormatted;
};

export  const isWithinRange = (fromDate, toDate, dueDate) => {
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


export const mapProgramIdToName = (programID) => {
  const name = programDictionary[programID]
    ? programDictionary[programID]
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

export {
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
  RetrieveProgramStage,
  RetrieveProgram
};
