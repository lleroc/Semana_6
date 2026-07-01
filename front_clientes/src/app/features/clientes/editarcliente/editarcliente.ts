import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteServices } from '../../../core/services/cliente.services';
import { Icliente } from '../../../core/interfaces/icliente';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-editarcliente',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './editarcliente.html',
  styleUrl: './editarcliente.css',
})
export class Editarcliente  {
  frmCliente:FormGroup;
  idCliente:number = 0

  private readonly fb = inject(FormBuilder)
  private readonly clienteServicio = inject(ClienteServices)
  private readonly rutas = inject(Router)
  //para edicion incrementar el activated route
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
        next:(cliente)=>{
          this.frmCliente.patchValue(cliente)
        },
        error:(error)=>{
          alert("No se pudo obtener el clieente")
          console.log(error)
        }
      }
    )
  }
  grabar(){
    const cli = this.frmCliente.value

    this.clienteServicio.actualizar(this.idCliente, cli).subscribe(
      {
        next:(cliente)=>{
          if(cliente){
            alert("Se guardo con exito")
            this.rutas.navigate(['/clientes'])
          }
        },
        error:(error)=>{
          alert("No se pudo actualizar")
          console.log(error)

        }
      }
    )
    
  }
}
