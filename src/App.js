import React, { useState } from "react";
import styles from "./App.module.css";
import Workload from "./components/Workload/Workload.jsx";
import WorkloadHeader from "./components/WorkloadHeader/WorkloadHeader.jsx";
import { CaseEnum, StatusEnum, DateEnum } from "./components/Enum/Enum";

const MyApp = () => {
  const [filterIndexCase, setFilterIndexCase] = useState(CaseEnum.ALL);
  const [filterStatus, setFilterStatus] = useState(StatusEnum.ALL);
  const [filterDate, setFilterDate] = useState(DateEnum.TODAY);

  const filterToggle = (value) => {
    setFilterIndexCase(value);
  };

  const statusToggle = (value) => {
    setFilterStatus(value);
  };

  return (
    <div className={styles.container}>
      <WorkloadHeader toggleFilter={filterToggle} toggleStatus={statusToggle} />
      <Workload indexFilterSelected={filterIndexCase} statusSelected={filterStatus} />
    </div>
  );
};

export default MyApp;
