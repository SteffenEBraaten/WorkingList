import React, { useState } from "react";
import {
  SingleSelect,
  SingleSelectOption,
  CircularLoader
} from "@dhis2/ui-core";
import styles from "./../Workload.module.css";
import { useDataQuery } from "@dhis2/app-runtime";

const MunicipalityChooser = ({ orgUnit, setOrgUnit }) => {
  const [selected, setSelected] = useState(orgUnit);

  const query = {
    me: {
      resource: "me"
    }
  };

  const { error, loading, data } = useDataQuery(query);

  if (loading) {
    return <CircularLoader />;
  }

  if (error) {
    <NoticeBox
      error
      title="Could not get orgUnit"
      className={styles.centerElement}
    >
      Could not get the organisation unit of the user. Please try again later.
    </NoticeBox>;
  }

  return (
    <div className={styles.MunicipalityChooser}>
      <SingleSelect
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
        <SingleSelectOption
          dataTest="dhis2-uicore-singleselectoption"
          label="Oslo kommune"
          value="wmbTtMfmQON"
        />
        <SingleSelectOption
          dataTest="dhis2-uicore-singleselectoption"
          label="Melhus kommune"
          value="Ir8lIUBoe8Y"
        />
      </SingleSelect>
    </div>
  );
};

export default MunicipalityChooser;

/*
{data.me.organisationUnits.map(item => (
          <SingleSelectOption
            dataTest="dhis2-uicore-singleselectoption"
            label={`${item.id} kommune`}
            value={`${item.id}`}
          />
        ))}
*/
