import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ClienteServices } from '../../core/services/cliente.services';
import { Icliente } from '../../core/interfaces/icliente';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-clientes',
  imports: [CommonModule, RouterLink],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes {
listaClientes:Icliente[] = []
private readonly clienteServicio = inject(ClienteServices)
private readonly detector = inject(ChangeDetectorRef)
private readonly rutas = inject(Router)  
  ngOnInit(): void {
      this.cargaLista()
  }
   async cargaLista(){
      this.clienteServicio.todos().subscribe({
            next: (lista)=>{
              this.listaClientes = lista
              this.detector.detectChanges()
            },
            error:(errores)=>{
              console.log(errores)
            }})
  }
  
}
