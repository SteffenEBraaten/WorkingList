import { StatusEnum } from "../components/Enum/Enum.jsx";

export const findValue = (listToSearch, code) => {
  return listToSearch.find((item) => item.code === code)
    ? listToSearch.find((item) => item.code === code).value
    : "N/A";
};

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

export default {
  findValue,
  isOverdue,
  isWithinRange,
  isHealthScheckOrFollowUp,
  evaluateFilter,
  mapProgramStageIdToName
};
