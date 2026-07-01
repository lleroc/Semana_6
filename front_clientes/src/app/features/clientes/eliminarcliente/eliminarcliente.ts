import { Component, inject, numberAttribute } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteServices } from '../../../core/services/cliente.services';
import { Icliente } from '../../../core/interfaces/icliente';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-eliminarcliente',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './eliminarcliente.html',
  styleUrl: './eliminarcliente.css',
})
export class Eliminarcliente {
 frmCliente:FormGroup;
 idCliente:number = 0
  private readonly fb = inject(FormBuilder)
  private readonly clienteServicio = inject(ClienteServices)
  private readonly rutas = inject(Router)
  private readonly parametros = inject(ActivatedRoute)
  constructor() {
    this.frmCliente = this.fb.group({
      cedula:new FormControl('',[Validators.maxLength(10), Validators.required]),
      nombres:new FormControl('', Validators.required),
      direccion:new FormControl('', Validators.required),
      telefono:new FormControl('',[Validators.maxLength(17), Validators.required]),
      correo:new FormControl('',[Validators.email, Validators.required]),
    })

    this.idCliente = Number(this.parametros.snapshot.paramMap.get('id'))
    this.cargaCliente()
  }
cargaCliente(){
  this.clienteServicio.uno(this.idCliente).subscribe(
    {
      next: cliente => {
        this.frmCliente.patchValue(cliente)
      },
      error: error =>{
        console.log(error)
        alert('No se logro encontrar al cliente')
      }
    }
  )
}
  eliminar(){
    Swal.fire({
      title: "Eliminar Clientes",
      text: "Desea Eliminar al cliente" + this.frmCliente.get('nombre'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar el cliente"
    }).then((result) => {
      if (result.isConfirmed){


        this.clienteServicio.eliminar(this.idCliente).subscribe(
          {
            next: mensaje =>{
              if (mensaje.message == 'ok'){
                Swal.fire({
                  title: "Clientes",
                  text: "El cliente fue elminado con exito",
                  icon: "success"
                });
                 this.rutas.navigate(['/clientes'])
              }
            }, error: error=>{
               Swal.fire({
                  title: "Clientes",
                  text: "No se puedo eliminar al cliente",
                  icon: "error"
                });
                console.log(error)
            }
          }
        )

      
      } 
       
    });
  }
}

