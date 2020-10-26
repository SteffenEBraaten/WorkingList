export const findValue = (listToSearch, code) => {
  return listToSearch.find((item) => item.code === code)
    ? listToSearch.find((item) => item.code === code).value
    : "N/A";
};

const eventIdDictornary = {
  oqsk2Jv4k3s: "Health status",
  sAV9jAajr8x: "Follow-up",
};

export const isHealthScheckOrFollowUp = (programStage) => {
  return eventIdDictornary[programStage] ? true : false;
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

export default { findValue, isOverdue, isWithinRange, isHealthScheckOrFollowUp };
