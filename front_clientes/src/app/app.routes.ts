import { Routes } from '@angular/router';
import { Clientes } from './features/clientes/clientes';
import { Nuevocliente } from './features/clientes/nuevocliente/nuevocliente';

export const routes: Routes = [
    {
        path:'',
        component:Clientes,
        pathMatch:'full'
    },
     {
        path:'clientes',
        component:Clientes,
        pathMatch:'full'
    },
    {
        path:'nuevocliente',
        component:Nuevocliente,
        pathMatch:'full'
    }
];
