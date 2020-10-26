export const toDateAndTimeFormat = (dateString, time = true) => {
  const date = time
    ? new Date(dateString).toLocaleString("no")
    : new Date(dateString).toLocaleDateString("no");
  return date;
};

const programDictonary = {
  uYjxkTbwRNf: "Index case",
  DM9n1bUw8W8: "Contact",
};

export const mapProgramIDToName = (programID) => {
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
  toDateAndTimeFormat,
  mapProgramIDToName,
  toDateObject,
  dueDateToDateObject,
};
