import { Component, inject, OnInit } from '@angular/core';
import { ClienteServices } from '../../core/services/cliente.services';
import { Icliente } from '../../core/interfaces/icliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes.component',
  imports: [],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  
  private readonly clienteServicio = inject(ClienteServices)
  private readonly rutas = inject(Router)

  listaClientes:Icliente[] = []

  ngOnInit(): void {
      this.cargaLista()
  }
  cargaLista(){
    this.clienteServicio.todos().subscribe(
      {
        next:(clientes =>{
          this.listaClientes = clientes
          console.log(this.listaClientes.length)
          console.log(clientes)
        }),
        error:(errores)=>{
          console.log(errores)
          
        }
      }
    )
  }
  


}
