import React, { useState } from "react";
import styles from "./App.module.css";
import Workload from "./components/Workload/Workload.jsx";
import WorkloadHeader from "./components/WorkloadHeader/WorkloadHeader.jsx";
import { CaseEnum, StatusEnum } from "./components/Enum/Enum";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";
import DoLocalStorage from "./components/Workload/ProgramToLocalStorage";


const MyApp = () => {
  const [filterIndexCase, setFilterIndexCase] = useState(CaseEnum.ALL);
  const [filterStatus, setFilterStatus] = useState(StatusEnum.ALL);
  const [filterDateRange, setFilterDate] = useState({
    from: utils().getToday(),
    to: null
  });
  const [numberOfFollowUps, setNumberOfFollowUps] = useState(0);
  const [numberOfHealthChecks, setNumberOfHealthChecks] = useState(0);

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
      <DoLocalStorage />
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
    </div>
  );
};

export default MyApp;


