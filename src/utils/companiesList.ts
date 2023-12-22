import { faker as faker } from '@faker-js/faker/locale/ru';

import { type CompanyType, type EmployeeType } from './types';

const randomCompanyName = () => faker.company.name();
const randomCompanyAddress = () => faker.location.streetAddress(true);
const randomEmployeeSurname = () => faker.person.lastName();
const randomEmployeeName = () => faker.person.firstName();
const randomEmployeePosition = () => faker.person.jobTitle();

const mockEmployeesData: EmployeeType[] = Array.from({ length: 333 }, () => [
    {
        surname: randomEmployeeSurname(),
        name: randomEmployeeName(),
        position: randomEmployeePosition(),
    },
]).flat();

const mockCompaniesData: CompanyType[] = Array.from({ length: 20 }, () => [
    {
        name: randomCompanyName(),
        address: randomCompanyAddress(),
        employees: mockEmployeesData,
    },
]).flat();

export const companiesList = mockCompaniesData;
