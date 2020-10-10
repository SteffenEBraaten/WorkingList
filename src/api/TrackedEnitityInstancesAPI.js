import { useDataQuery } from "@dhis2/app-runtime";

const fetchTrackedEntityInstances = (organisationUnit) => {
  const query = {
    allIndexCases: {
      resource: "trackedEntityInstances",
      params: {
        ou: organisationUnit,
        paging: false,
      },
    },
  };

  return useDataQuery(query);
};

export const generateIndexCases = ({ allIndexCases }) => {
  return allIndexCases.trackedEntityInstances.map((indexCase) => ({
    orgUnit: indexCase.orgUnit,
    trackedEntityInstance: indexCase.trackedEntityInstance,
    trackedEntityType: indexCase.trackedEntityType,
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
  }));
};

export default fetchTrackedEntityInstances;
