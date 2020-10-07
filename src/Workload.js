import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { Menu, MenuItem } from "@dhis2/ui";
import styles from "./App.module.css";
import WorkloadHeader from "./WorkloadHeader.js";

const query = {
  allIndexCases: {
    resource: "trackedEntityInstances",
    params: {
      ou: "BPzJYNBjmwO",
      ouMode: "DESCENDANTS",
      trackedEntity: "MCPQUTHX1Ze",
      program: "uYjxkTbwRNf",
      paging: false,
    },
  },
};

const Workload = () => {
  /*   const { error, loading, data } = useDataQuery(query);
   */
  /* if (error) {
    return <p>Error</p>;
  }
  if (loading) {
    return <p>Loading</p>;
  } */

  return (
    <>
      <p>Index cases and contacts</p>
      <WorkloadHeader />
      <Menu>
        {/* {data.trackedEntityInstances.map(({ sB1IHYu2xQT }) => ( */}
        <MenuItem
          dataTest={`list-indexCases-${"firstName"}`}
          key={"firstName"}
          label={"Tine Margretha Vister"}
        />
      </Menu>
    </>
  );
};
export default Workload;
