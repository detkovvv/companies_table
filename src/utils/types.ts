export type CompanyType = {
    name: string;
    address: string;
    employees: Array<EmployeeType>;
};

export type EmployeeType = {
    surname: string;
    name: string;
    position: string;
};
export type EmployeeFullType = {
    surname: string;
    name: string;
    position: string;
    id: string;
};

export type CompanyFullType = {
    name: string;
    address: string;
    employees: Array<EmployeeFullType>;
    staff: number;
    id: string;
};

export type OnChangeCellValue = {
    rowId: string;
    columnId: string;
    value: string | number;
};
