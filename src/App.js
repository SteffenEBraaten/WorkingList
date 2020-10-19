import React, { useState } from "react";
import styles from "./App.module.css";
import Workload from "./components/Workload/Workload.jsx";
import WorkloadHeader from "./components/WorkloadHeader/WorkloadHeader.jsx";

const MyApp = () => {
  const [filterIndexCase, setFilterIndexCase] = useState("1");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterDate, setFilterDate] = useState("1");

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
