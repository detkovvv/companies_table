import React from 'react';

import { CompaniesList } from '../../components/CompaniesList/CompaniesList';
import { EmployeesList } from '../../components/EmployeesList/EmployeesList';

export const MainPage = () => {

    return (
        <div>
            <CompaniesList />
            <EmployeesList />
        </div>
        
    )

}

