import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { NoticeBox, CircularLoader } from "@dhis2/ui";
import { CaseEnum } from "../Enum/Enum";
import { retrieveProgram, retrieveProgramStage } from "../../utils/APIUtils"

// custom hooks
const addLocalStorage = (list, program, setLocalStore) => {
    if (localStorage[program] == undefined) {
        localStorage.setItem(program, JSON.stringify([]))

        const tempStorage = JSON.parse(localStorage[program]);

        list.forEach(element => {
            tempStorage.push(element)
        });
        localStorage.setItem(program, JSON.stringify(tempStorage));
    }
}

export const retrieveLocalStorage = (program, type) => {
    switch (type) {
        case CaseEnum.INDEXES:
            return JSON.parse(localStorage[program])[0];
        case CaseEnum.CONTACTS:
            return JSON.parse(localStorage[program])[1];
        default:
    }
}


export const useLocalStorage = (intialValue) => {
    const [storedValue, setStoredValue] = useState(localStorage[intialValue]);
    const setLocalStore = (data, program) => {
        if (data === undefined) return
        let list = [];
        if (program !== undefined && program === "programStages") {
            list = data.programStages.programStages.filter(e => e.displayName == "Health status" || e.displayName == "Follow-up");

        } else if (program !== undefined && program === "programs") {
            list = data.programs.programs.filter(e => e.displayName.includes("Index case") || e.displayName.includes("Contact"));
        }
        localStorage.setItem(program, JSON.stringify([]))

        const tempStorage = JSON.parse(localStorage[program]);

        list.forEach(element => {
            tempStorage.push(element)
        });
        localStorage.setItem(program, JSON.stringify(tempStorage));
        console.log("adding localstorage: ", localStorage[program])
        setStoredValue(localStorage[program]);
        if (program === "programStages") {
            retrieveProgramStage();
        }
        else {
            retrieveProgram();
        }

    }
    return [storedValue, setLocalStore];
}

