import React, { useState } from "react";
import styles from "./App.module.css";
import Workload from "./components/Workload/Workload.jsx";
import WorkloadHeader from "./components/WorkloadHeader/WorkloadHeader.jsx";
import { CaseEnum, StatusEnum, DateEnum } from "./components/Enum/Enum";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";
const MyApp = () => {
  const [filterIndexCase, setFilterIndexCase] = useState(CaseEnum.ALL);
  const [filterStatus, setFilterStatus] = useState(StatusEnum.ALL);
  const [filterDateRange, setFilterDate] = useState({from:utils().getToday(), to:null});
  const [numberOfCases, setNumberOfCases] = useState(0);

  const filterToggle = (value) => {
    setFilterIndexCase(value);
  };
  const statusToggle = (value) => {
    setFilterStatus(value);
  };
  const dateToggle = (value) => {
    setFilterDate(value);
  };

  return (
    <div className={styles.container}>
      <WorkloadHeader
        toggleFilter={filterToggle}
        toggleStatus={statusToggle}
        toggleDate={dateToggle}
        dateSelected={filterDate}
        numberOfCases={numberOfCases}
      />
      <Workload
        indexFilterSelected={filterIndexCase}
        statusSelected={filterStatus}
        dateSelected={filterDate}
        setNumberOfCases={setNumberOfCases}
      />
    </div>
  );
};

export default MyApp;
