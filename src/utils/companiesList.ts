import { faker as faker } from '@faker-js/faker/locale/ru';

import { type CompanyType } from './types';

const randomCompanyName = () => faker.company.name();
const randomCompanyAddress = () => faker.location.streetAddress(true);
const randomEmployeeSurname = () => faker.person.lastName();
const randomEmployeeName = () => faker.person.firstName();
const randomEmployeePosition = () => faker.person.jobTitle();

function randomInteger(min: number, max: number) {
    return min + Math.round(Math.random() * (max - min));
}

const mockEmployeesData = () =>
    Array.from({ length: randomInteger(3, 1000) }, () => [
        {
            surname: randomEmployeeSurname(),
            name: randomEmployeeName(),
            position: randomEmployeePosition(),
        },
    ]).flat();

const mockCompaniesData: CompanyType[] = Array.from({ length: randomInteger(3, 100) }, () => [
    {
        name: randomCompanyName(),
        address: randomCompanyAddress(),
        employees: mockEmployeesData(),
    },
]).flat();

export const companiesList = mockCompaniesData;
