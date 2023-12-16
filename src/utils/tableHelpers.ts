import { type CompanyType } from './types';

export const arrayInsertId = function <T extends object>(
    arr: Array<T>,
): Array<T & { id: string }> {
    return arr.map((item) => ({ ...item, id: crypto.randomUUID() }));
};

export const arrayInsertEmployees = function <K extends CompanyType>(
    arr: Array<K>,
): Array<K & { staff: string }> {
    return arr.map((item) => ({ ...item, staff: item.employees.length }));
};

export const getHeaderFromObject = ({ order, head, }: { order: string[]; head: object; }) => {
    return order.map((key) => ({ title: head[key], key }));
};
