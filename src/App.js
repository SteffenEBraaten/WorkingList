import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Workload from "./components/Workload/Workload.jsx";
import WorkloadHeader from "./components/WorkloadHeader/WorkloadHeader.jsx";
import { CaseEnum, StatusEnum } from "./components/Enum/Enum";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";
import { useLocalStorage } from "./components/Workload/ProgramToLocalStorage";
import { NoticeBox, CircularLoader } from "@dhis2/ui";

import { useDataQuery } from "@dhis2/app-runtime";

const MyApp = () => {
  const [filterIndexCase, setFilterIndexCase] = useState(CaseEnum.ALL);
  const [filterStatus, setFilterStatus] = useState(StatusEnum.ALL);
  const [filterDateRange, setFilterDate] = useState({
    from: utils().getToday(),
    to: null
  });
  const [numberOfFollowUps, setNumberOfFollowUps] = useState(0);
  const [numberOfHealthChecks, setNumberOfHealthChecks] = useState(0);
  const [storedPrograms, setStoredPrograms] = useLocalStorage("programs");
  const [storedStages, setStoredProgramStages] = useLocalStorage("programStages");

  const queryPrograms = {
    programs: {
      resource: "programs",
    },
  };

  const queryProgramStages = {
    programStages: {
      resource: "programStages",
    },
  };

  const {
    error: errorProgram,
    loading: loadingProgram,
    data: dataProgram
  } = useDataQuery(queryPrograms);

  const {
    error: errorStages,
    loading: loadingStages,
    data: dataStages
  } = useDataQuery(queryProgramStages);
  useEffect(() => {
    setStoredPrograms(dataProgram, "programs");
    setStoredProgramStages(dataStages, "programStages");
  }, [setStoredPrograms])


  if (loadingProgram | loadingStages) {
    return (<CircularLoader />);
  }

  if (errorProgram | errorStages) {
    return (<NoticeBox error>Could not retrieve from storage</NoticeBox>);
  }
  const filterToggle = value => {
    setFilterIndexCase(value);
  };
  const statusToggle = value => {
    setFilterStatus(value);
  };
  const dateToggle = value => {
    setFilterDate(value);
  };
  return (
    <div className={styles.container}>
      <WorkloadHeader
        toggleFilter={filterToggle}
        toggleStatus={statusToggle}
        toggleDate={dateToggle}
        datesSelected={filterDateRange}
        numberOfFollowUps={numberOfFollowUps}
        numberOfHealthChecks={numberOfHealthChecks}
      />
      <Workload
        indexFilterSelected={filterIndexCase}
        statusSelected={filterStatus}
        datesSelected={filterDateRange}
        setNumberOfFollowUps={setNumberOfFollowUps}
        setNumberOfHealthChecks={setNumberOfHealthChecks}
      />
    </div >
  );
};

export default MyApp;


