export type CompanyType = {
    name: string;
    address: string;
    employees: Array<EmployeeType>;
};

export type EmployeeType = Record<'surname' | 'name' | 'position' | 'id', string>;

export type CompanyFullType = CompanyType & {
    stuff: number;
    id: string;
};
