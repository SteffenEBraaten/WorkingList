import { useDataQuery } from "@dhis2/app-runtime";

const fetchContacts = (organisationUnit, status) => {
  const query = {
    allIndexCases: {
      resource: "trackedEntityInstances",
      params: {
        program: "DM9n1bUw8W8",
        programStatus: status !== "ALL" ? status : null,
        // filter: `programStatus:eq:${programStatus}`,
        ou: organisationUnit,
        paging: false,
        fields:
          "created,orgUnit,attributes,trackedEntityType,trackedEntityInstance,enrollments,lastUpdated,inactive",
      }
    },
  };
  // console.log("QUERY status: ", query.allIndexCases.params.programStatus);


  return useDataQuery(query);
};

const fetchIndexcases = (organisationUnit, option) => { // Fetch index
  const query = {
    allIndexCases: {
      resource: "trackedEntityInstances",
      params: ({ programStatus }) => ({
        program: "uYjxkTbwRNf",
        // programStatus: status !== "ALL" ? status : null,
        filter: `programStatus:eq:${programStatus}`,
        ou: organisationUnit,
        paging: false,
        fields:
          "created,orgUnit,attributes,trackedEntityType,trackedEntityInstance,enrollments,lastUpdated,inactive",
      })
    },
  };

  return useDataQuery(query, option);
};

const generateResponse = ({ allIndexCases }) => {
  return allIndexCases.trackedEntityInstances.map((indexCase) => ({
    orgUnit: indexCase.orgUnit,
    trackedEntityInstance: indexCase.trackedEntityInstance,
    trackedEntityType: indexCase.trackedEntityType,
    lastUpdated: indexCase.lastUpdated,
    programID: indexCase.enrollments[0].program
      ? indexCase.enrollments[0].program
      : "N/A",
    incidentDate: indexCase.enrollments[0].incidentDate
      ? indexCase.enrollments[0].incidentDate
      : "N/A",
    caseStatus: indexCase.enrollments[0].status,
    firstName: indexCase.attributes.find((item) => item.code === "first_name")
      ? indexCase.attributes.find((item) => item.code === "first_name").value
      : "N/A",
    lastName: indexCase.attributes.find((item) => item.code === "surname")
      ? indexCase.attributes.find((item) => item.code === "surname").value
      : "N/A",
    dateOfBirth: indexCase.attributes.find(
      (item) => item.code === "patinfo_ageonsetunit"
    )
      ? indexCase.attributes.find(
        (item) => item.code === "patinfo_ageonsetunit"
      ).value
      : "N/A",
    gender: indexCase.attributes.find((item) => item.code === "patinfo_sex")
      ? indexCase.attributes.find((item) => item.code === "patinfo_sex").value
      : "N/A",
    phoneNumber: indexCase.attributes.find(
      (item) => item.code === "phone_local"
    )
      ? indexCase.attributes.find((item) => item.code === "phone_local").value
      : "N/A",
    age: indexCase.attributes.find((item) => item.code === "patinfo_ageonset")
      ? indexCase.attributes.find((item) => item.code === "patinfo_ageonset")
        .value
      : "N/A",

  }));
};

export { fetchIndexcases, fetchContacts, generateResponse };
