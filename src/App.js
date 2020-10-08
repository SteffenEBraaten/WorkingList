import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import { Menu, MenuItem, MenuSectionHeader } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import styles from "./App.module.css";
import Workload from "./Workload.js";
import WorkloadHeader from "./WorkloadHeader";

const query = {
  me: {
    resource: "me",
  },
};

const MyApp = () => {
  const [filterIndexCase, setFilterIndexCase] = useState("1")

  const filterToggle = (value) => {
    setFilterIndexCase(value)
  }

  return (
    <div className={styles.container}>
      {/* <DataQuery query={query}>
        {({ error, loading, data }) => {
          if (error) return <span>ERROR</span>;
          if (loading) return <span>...</span>;
          return <div>{<Workload />}</div>;
        }}
      </DataQuery> */}
      {<WorkloadHeader toggle={filterToggle} />}
      {<Workload indexFilterSelected={filterIndexCase} />}
    </div>
  );
};

export default MyApp;
