export type CompanyType = {
    name: string;
    address: string;
    employees: Array<EmployeeType>;
};

export type EmployeeType = {
    surname: string;
    name: string;
    position: string;
    id: string;
    isSelected: boolean;
};

export type CompanyFullType = CompanyType & {
    stuff: number;
    id: string;
    isSelected: boolean;
};
