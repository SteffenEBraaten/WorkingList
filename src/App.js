import React, { useState } from "react";
import styles from "./App.module.css";
import Workload from "./components/Workload/Workload.jsx";
import WorkloadHeader from "./components/WorkloadHeader/WorkloadHeader.jsx";
import { CaseEnum, StatusEnum, DateEnum } from "./components/Enum/Enum";

const MyApp = () => {
  const [filterIndexCase, setFilterIndexCase] = useState(CaseEnum.ALL);
  const [filterStatus, setFilterStatus] = useState(StatusEnum.ALL);
  const [filterDate, setFilterDate] = useState(DateEnum.TODAY);
  const [selectedDay, setSelectedDay] = useState(utils().getToday());
  
  const filterToggle = (value) => {
    setFilterIndexCase(value);
  };

  const statusToggle = (value) => {
    setFilterStatus(value);
  };
  const selectedDayToggle = (value) => {
    setSelectedDay(value);
  };

  return (
    <div className={styles.container}>
      <WorkloadHeader toggleFilter={filterToggle} toggleStatus={statusToggle} selectedDayToggle={selectedDayToggle} selectedDay={selectedDay} />
      <Workload indexFilterSelected={filterIndexCase} statusSelected={filterStatus} selectedDay={selectedDay} />
    </div>
  );
};

export default MyApp;
