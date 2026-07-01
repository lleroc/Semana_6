import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteServices } from '../../../core/services/cliente.services';
import { Icliente } from '../../../core/interfaces/icliente';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nuevocliente',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './nuevocliente.html',
  styleUrl: './nuevocliente.css',
})
export class Nuevocliente {
  frmCliente:FormGroup;
  private readonly fb = inject(FormBuilder)
  private readonly clienteServicio = inject(ClienteServices)
  private readonly rutas = inject(Router)
  constructor() {
    this.frmCliente = this.fb.group({
      cedula:new FormControl('',[Validators.maxLength(10), Validators.required]),
      nombres:new FormControl('', Validators.required),
      direccion:new FormControl('', Validators.required),
      telefono:new FormControl('',[Validators.maxLength(17), Validators.required]),
      correo:new FormControl('',[Validators.email, Validators.required]),
    })
  }
  grabar(){
    const cliente:Icliente = this.frmCliente.value
    this.clienteServicio.nuevo(cliente).subscribe(
      {
        next: (cliente_nuevo)=>{
          if(cliente_nuevo){
            this.rutas.navigate(['/clientes'])
          }else{
            alert("Ocurrio un error al guardar")
          }
        },  
        error:(error)=>{
          alert(error)
        }
      }
    )
  }

}
