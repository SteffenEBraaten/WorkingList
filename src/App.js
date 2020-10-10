import React, { useState } from "react";
import styles from "./App.module.css";
import Workload from "./components/Workload/Workload.jsx";
import WorkloadHeader from "./components/WorkloadHeader/WorkloadHeader.jsx";

const MyApp = () => {
  const [filterIndexCase, setFilterIndexCase] = useState("1");

  const filterToggle = (value) => {
    setFilterIndexCase(value);
  };

  return (
    <div className={styles.container}>
      <WorkloadHeader toggle={filterToggle} />
      <Workload indexFilterSelected={filterIndexCase} />
    </div>
  );
};

export default MyApp;
