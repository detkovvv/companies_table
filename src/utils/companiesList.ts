import { type CompanyType, type EmployeeType } from './types';

const mockEmployees: EmployeeType[] = Array.from({ length: 333 }, () => [
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

const mockCompany: CompanyType[] = Array.from({ length: 20 }, () => [
    {
        name: 'Аэрофлот',
        address: 'г. Москва, ул. Ленина, д. 111',
        employees: mockEmployees,
    },
    {
        name: 'Северсталь',
        address: 'г. Москва, ул. Ленина, д. 111',
        employees: mockEmployees,
    },
    {
        name: 'Газпром',
        address: 'г. Москва, ул. Ленина, д. 111',
        employees: mockEmployees,
    },
]).flat();

export const companiesList = mockCompany;
