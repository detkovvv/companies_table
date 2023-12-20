import { type CompanyType, type EmployeeType } from './types';

const mockEmployeesData: EmployeeType[] = Array.from({ length: 333 }, () => [
    {
        surname: 'Сидоров',
        name: 'Александр',
        position: 'Генеральный директор',
    },
    {
        surname: 'Петров',
        name: 'Александр',
        position: 'Главный бухгалтер',
    },
    {
        surname: 'Иванова',
        name: 'Екатерина',
        position: 'Финансовый директор',
    },
]).flat();

const mockCompaniesData: CompanyType[] = Array.from({ length: 20 }, () => [
    {
        name: 'Аэрофлот',
        address: 'г. Москва, ул. Ленина, д. 111',
        employees: mockEmployeesData,
    },
    {
        name: 'Северсталь',
        address: 'г. Москва, ул. Ленина, д. 111',
        employees: mockEmployeesData,
    },
    {
        name: 'Газпром',
        address: 'г. Москва, ул. Ленина, д. 111',
        employees: mockEmployeesData,
    },
]).flat();

export const companiesList = mockCompaniesData;
