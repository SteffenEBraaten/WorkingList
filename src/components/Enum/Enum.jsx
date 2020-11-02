const CaseEnum = Object.freeze({
	ALL: "ALL",
	INDEXES: "INDEXES",
	CONTACTS: "CONTACTS"
});

const StatusEnum = Object.freeze({
	ALL: "ALL",
	ACTIVE: "ACTIVE",
	SCHEDULE: "SCHEDULE",
	OVERDUE: "OVERDUE",
	COMPLETED: "COMPLETED",
	SKIPPED: 'SKIPPED'
});

const StorageEnum = Object.freeze({
	PROGRAMS: "programs",
	PROGRAMSTAGES: "programStages",
});

export { CaseEnum, StatusEnum, StorageEnum };
