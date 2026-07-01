import { Routes } from '@angular/router';
import { Clientes } from './features/clientes/clientes';
import { Nuevocliente } from './features/clientes/nuevocliente/nuevocliente';
import { Editarcliente } from './features/clientes/editarcliente/editarcliente';
import { Eliminarcliente } from './features/clientes/eliminarcliente/eliminarcliente';

export const routes: Routes = [
    {
        path:'',
        component:Clientes,
        pathMatch:'full'
    },
     {
        path:'clientes',
        loadChildren:()=>
            import ('./features/clientes/clientes.route').then(
                m => m.CLIENTE_ROUTES
            ),
    } 
    /*,
    {
        path:'nuevocliente',
        component:Nuevocliente,
        pathMatch:'full'
    }
    ,
    {
        path:'editarcliente/:id',
        component:Editarcliente,
        pathMatch:'full'
    }
     ,
    {
        path:'eliminarcliente/:id',
        component:Eliminarcliente,
        pathMatch:'full'
    }*/
];
