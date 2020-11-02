import React, { useState } from "react";
import styles from "./App.module.css";
import Workload from "./components/Workload/Workload.jsx";
import WorkloadHeader from "./components/WorkloadHeader/WorkloadHeader.jsx";
import { CaseEnum, StatusEnum } from "./components/Enum/Enum";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from "react-modern-calendar-datepicker";
import DoLocalStorage from "./components/Workload/ProgramToLocalStorage";
import UserProvider from "./components/WorkloadHeader/UserContext";

const MyApp = () => {
  const [filterIndexCase, setFilterIndexCase] = useState(CaseEnum.ALL);
  const [filterStatus, setFilterStatus] = useState(StatusEnum.ALL);
  const [filterDateRange, setFilterDate] = useState({
    from: utils().getToday(),
    to: null,
  });
  const [numberOfFollowUps, setNumberOfFollowUps] = useState(0);
  const [numberOfHealthChecks, setNumberOfHealthChecks] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [orgUnit, setOrgUnit] = useState("a8QXqdXyhNr");

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
      <DoLocalStorage />
      <UserProvider>
        <WorkloadHeader
          toggleFilter={filterToggle}
          toggleStatus={statusToggle}
          toggleDate={dateToggle}
          datesSelected={filterDateRange}
          numberOfFollowUps={numberOfFollowUps}
          numberOfHealthChecks={numberOfHealthChecks}
          orgUnit={orgUnit}
          setOrgUnit={setOrgUnit}
          setSearchValue={setSearchValue}
        />
      </UserProvider>
      <Workload
        indexFilterSelected={filterIndexCase}
        statusSelected={filterStatus}
        datesSelected={filterDateRange}
        orgUnit={orgUnit}
        searchValue={searchValue}
        setNumberOfFollowUps={setNumberOfFollowUps}
        setNumberOfHealthChecks={setNumberOfHealthChecks}
      />
    </div>
  );
};

export default MyApp;
