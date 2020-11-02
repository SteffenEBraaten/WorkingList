import React, { useState } from "react";
import {
  SingleSelect,
  SingleSelectOption,
  CircularLoader,
} from "@dhis2/ui-core";
import styles from "./WorkloadHeader.module.css";
import { useDataQuery } from "@dhis2/app-runtime";
import { useUser } from "./UserContext";
import commonStyles from "../../App.module.css";

const queryOrgUnit = {
  orgUnit: {
    resource: "organisationUnits",
    params: {
      fields: ["id", "displayName"],
      paging: false,
    },
  },
};

const getMappingFromIdToName = (allOrgUnits, userOrgUnits) => {
  const mapping = [];

  userOrgUnits.map((item) => {
    const id = item.id;

    for (let i = 0; i < allOrgUnits.length; i++) {
      if (allOrgUnits[i].id === id) {
        mapping.push({
          id: id,
          name: allOrgUnits[i].displayName,
        });
        break;
      }
    }
  });
  return mapping;
};

const MunicipalityChooser = ({ orgUnit, setOrgUnit }) => {
  const [selected, setSelected] = useState(orgUnit);

  const user = useUser();

  const {
    error: orgUnitError,
    loading: orgUnitLoading,
    data: orgUnitData,
  } = useDataQuery(queryOrgUnit);

  if (user.loading || orgUnitLoading) {
    return <CircularLoader />;
  }

  if (user.error || orgUnitError) {
    <NoticeBox
      error
      title="Could not get orgUnit"
      className={commonStyles.centerElement}
    >
      Could not get the organisation unit of the user. Please try again later.
    </NoticeBox>;
  }

  const mapIdToName = getMappingFromIdToName(
    orgUnitData.orgUnit.organisationUnits,
    user.data.me.organisationUnits
  );

  return (
    <div className={styles.MunicipalityChooser}>
      <SingleSelect
        label="Choose municipality"
        className="select"
        dataTest="dhis2-uicore-singleselect"
        onChange={function onChange(value) {
          setSelected(value.selected);
          setOrgUnit(value.selected);
        }}
        selected={selected}
      >
        <SingleSelectOption
          dataTest="dhis2-uicore-singleselectoption"
          label="Måsøy kommune"
          value="a8QXqdXyhNr"
        />

        {mapIdToName.map((item) => (
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label={`${item.name}`}
            value={`${item.id}`}
            key={`${item.id}`}
          />
        ))}
      </SingleSelect>
    </div>
  );
};

export default MunicipalityChooser;
