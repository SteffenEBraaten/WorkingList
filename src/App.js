import React, { useState } from "react";
import { DataQuery } from "@dhis2/app-runtime";
import { Menu, MenuItem, MenuSectionHeader } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import styles from "./App.module.css";
import CasesAndContacts from "./CasesAndContacts.js";

const MyApp = () => {
  const [showIndexCases, getIndexCases] = useState(false);

  return (
    <div className={styles.container}>
      <nav className={styles.menu} data-test-id="menu">
        <MenuSectionHeader label={i18n.t("Menu")} />
        <Menu>
          <MenuItem
            label={i18n.t("Cases and contact")}
            dataTest="menu-cases-and-contacts"
            onClick={() => getIndexCases(true)}
          />
          <MenuItem label={i18n.t("Follow-ups")} dataTest="menu-follow-ups" />
        </Menu>
      </nav>
      {/* {showIndexCases && <CasesAndContacts />} */}
      {/* <DataQuery query={query}>
            {({ error, loading, data }) => {
                if (error) return <span>ERROR</span>
                if (loading) return <span>...</span>
                return (
                    <>
                        <h1>
                            {i18n.t('Hello {{name}}', { name: data.me.name })}
                        </h1>
                        <h3>{i18n.t('Welcome to DHIS2!')}</h3>
                    </>
                )
            }}
        </DataQuery> */}
    </div>
  );
};

export default MyApp;
