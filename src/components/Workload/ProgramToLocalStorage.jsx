import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { NoticeBox, CircularLoader} from "@dhis2/ui";
import { CaseEnum } from "../Enum/Enum";


const addLocalStorage = (list, program) => {
    if (localStorage[program] == undefined) {
        localStorage.setItem(program, JSON.stringify([]))
        console.log("kommer inn")
    
        const tempStorage = JSON.parse(localStorage[program]);

        list.forEach(element => {
            tempStorage.push(element)
        });
        localStorage.setItem(program, JSON.stringify(tempStorage));
    } 
}

export const retrieveLocalStorage = (program, type) => {
    switch(type){
        case CaseEnum.INDEXES:
            return JSON.parse(localStorage[program])[0];
        case CaseEnum.CONTACTS:
            return JSON.parse(localStorage[program])[1];
        default:
    }
} 


const DoLocalStorage = () => {
    const queryPrograms = {
        programs: {
          resource: "programs",
        },
    };
    
    const queryProgramStages = {
        programStages: {
          resource: "programStages",
        },
    };

    const { 
        error: errorProgram, 
        loading: loadingProgram, 
        data: dataProgram 
    } = useDataQuery(queryPrograms);

    const { 
        error: errorStages, 
        loading: loadingStages, 
        data: dataStages 
    } = useDataQuery(queryProgramStages);
    
    if (loadingProgram | loadingStages) {
        return <CircularLoader />;
    }

    if (errorProgram | errorStages) {
        <NoticeBox error>Could not retrieve from storage</NoticeBox>;
    }
    
    addLocalStorage(
        dataStages.programStages.programStages.filter(e => e.displayName == "Health status" || e.displayName == "Follow-up"),
        "programStages"
    );

    addLocalStorage(
        dataProgram.programs.programs.filter( e => e.displayName.includes("Index case") || e.displayName.includes("Contact")),
        "programs"
    ); 

    return (null)
}

export default DoLocalStorage;