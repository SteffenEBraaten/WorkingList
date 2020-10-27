export const findValue = (listToSearch, code) => {
  return listToSearch.find(item => item.code === code)
    ? listToSearch.find(item => item.code === code).value
    : "N/A";
};

export default { findValue };
