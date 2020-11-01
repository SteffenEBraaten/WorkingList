import React, { useState } from "react";
import {
  SingleSelect,
  SingleSelectOption,
  CircularLoader
} from "@dhis2/ui-core";
import styles from "./WorkloadHeader.module.css";
import { useDataQuery } from "@dhis2/app-runtime";

const queryMe = {
  me: {
    resource: "me"
  }
};

const queryOrgUnit = {
  orgUnit: {
    resource: "organisationUnits",
    params: {
      fields: ["id", "displayName"],
      paging: false
    }
  }
};

const getMappingFromIdToName = (allOrgUnits, userOrgUnits) =>{
  const mapping = []

  userOrgUnits.map((item) => {
    const id = item.id

    for (var i = 0; i<allOrgUnits.length; i++){
      if (allOrgUnits[i].id === id){
        mapping.push({
          id: id,
          name: allOrgUnits[i].displayName
        })
        break;
      }
    }
  })
  return mapping
}

const MunicipalityChooser = ({ orgUnit, setOrgUnit }) => {
  const [selected, setSelected] = useState(orgUnit);

  const { error: meError, loading: meLoading, data: meData } = useDataQuery(
    queryMe
  );
  const {
    error: orgUnitError,
    loading: orgUnitLoading,
    data: orgUnitData
  } = useDataQuery(queryOrgUnit);

  if (meLoading || orgUnitLoading) {
    return <CircularLoader />;
  }

  if (meError || orgUnitError) {
    <NoticeBox
      error
      title="Could not get orgUnit"
      className={styles.centerElement}
    >
      Could not get the organisation unit of the user. Please try again later.
    </NoticeBox>;
  }

  const mapIdToName = getMappingFromIdToName(orgUnitData.orgUnit.organisationUnits, meData.me.organisationUnits)

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
