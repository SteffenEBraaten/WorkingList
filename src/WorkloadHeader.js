import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { Menu, MenuItem, SplitButton } from "@dhis2/ui";
import styles from "./App.module.css";

const WorkloadHeader = () => {
  return (
    <div class="workloadHeader">
      <SplitButton
        component={<span>Simplest thing</span>}
        dataTest="dhis2-uicore-splitbutton"
        name="default"
        value="nothing"
      >
        Index cases and contacts
      </SplitButton>
      <SplitButton
        component={<span>Simplest thing</span>}
        dataTest="dhis2-uicore-splitbutton"
        name="default"
        value="nothing"
      >
        All
      </SplitButton>
      <SplitButton
        component={<span>Simplest thing</span>}
        dataTest="dhis2-uicore-splitbutton"
        name="default"
        value="nothing"
      >
        Today
      </SplitButton>
    </div>
  );
};
export default WorkloadHeader;
