import { Routes } from "@angular/router";
import { Clientes } from "./clientes";
import { Nuevocliente } from "./nuevocliente/nuevocliente";
import { Editarcliente } from "./editarcliente/editarcliente";
import { Eliminarcliente } from "./eliminarcliente/eliminarcliente";

export const CLIENTE_ROUTES: Routes =[
    {
        path:'',
        component:Clientes
    },{
        path:'nuevo',
        component:Nuevocliente
    },{
        path:'editar/:id',
        component:Editarcliente
        },
        {
            path:'eliminar/:id',
            component:Eliminarcliente
        }

]