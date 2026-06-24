import { Component, inject, OnInit } from '@angular/core';
import { ClienteServices } from '../../core/services/cliente.services';
import { Icliente } from '../../core/interfaces/icliente';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-clientes',
  imports: [CommonModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes {
listaClientes:any[] = []
/**
 *
 */
constructor(private readonly clienteServicio:ClienteServices) {
}
  private readonly rutas = inject(Router)

  
  ngOnInit(): void {
   

      this.cargaLista()
  }
   async cargaLista(){
    
      this.clienteServicio.todos().subscribe(
          {
            next: (lista:any[])=>{
              
              this.listaClientes = lista
              
              this.listaClientes.forEach(cl => {
                console.log(cl)
              });

            },
            error:(errores)=>{
              console.log(errores)
              
            }
          }
        )
  }
  
}
