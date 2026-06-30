import { ChangeDetectorRef, Component, inject, OnInit, ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR } from '@angular/core';
import { ClienteServices } from '../../core/services/cliente.services';
import { Icliente } from '../../core/interfaces/icliente';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import DataTables from 'datatables.net-dt' 
import 'datatables.net-buttons'
import 'datatables.net-buttons-dt'
import pdfmake from 'pdfmake/build/pdfmake'
import  pdfFonts from 'pdfmake/build/vfs_fonts'

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
private tabla_Clientes:any;
  ngOnInit(): void {
      this.cargaLista()   
      const fuentes = (pdfFonts as any).vfs || (pdfFonts as any).pdfmake.vfs;
      (pdfmake as any).vfs = fuentes;
  }
   async cargaLista(){
    await this.clienteServicio.todos().subscribe({
            next: (lista)=>{
              this.listaClientes = lista
              this.detector.detectChanges()
              setTimeout(()=>{
                this.inicializador()
              },1);
            },
            error:(errores)=>{
              console.log(errores)
            }})
  }
  inicializador(){
    if(this.tabla_Clientes){
      this.tabla_Clientes.destroy()
    }
    this.tabla_Clientes = new DataTables("#tabla_Clientes",{
      paging:true,
      searching:true,
      ordering:true,
      pageLength:5,
      lengthMenu:[5, 10, 25, 50],
            language:{
        search:'Buscador:',
        lengthMenu:'Mostrar _MENU_ registros',
        info:'Mostrando _START_ a _END_ de _TOTAL_ de clientes',
        infoEmpty:'No existren registros',
        infoFiltered:'filtrando _MAX_ de registros',
        paginate:{
          first:'<<',
          previous:'<',
          next:'>',
          last:'>>'
        }
      }, 
     
    })
  }
  imprimirPDF(){
    const cuerpoTabla = this.listaClientes.map((cliente, index)=>[
      index + 1,
      cliente.cedula,
      cliente.nombres,
      cliente.direccion,
      cliente.telefono,
      cliente.correo
    ])

    console.log(cuerpoTabla)

    const documento:any ={
      pageSize:'A4',
      
      content:[
        {
          text:'Lista de Clientes',
          style:'titulo',
          alignment:'center',
          margin:[0,0,0,15],
        },
        {
          table:{
            headerRows:1,
            widths:[10,'auto','auto','auto','auto','auto'],
            body:[
              [
                {text: '#', style:'cabecera'},
                {text: 'Cedula', style:'cabecera'},
                {text: 'Nombres', style:'cabecera'},
                {text: 'Direccion', style:'cabecera'},
                {text: 'Telefono', style:'cabecera'},
                {text: 'Correo', style:'cabecera'},
              ], 
              ...cuerpoTabla
            ]
          }
        }
      ],
      styles:{
        titulo:{
          fontSize:18,
          bold:true
        },
        cabecera:{
          bold:true,
          fontSize:12,
          color:'black'
        }
      },
      defaultStyle:{
        fontSize:9
      }

    }

    pdfmake.createPdf(documento).download('lista_clientes.pdf')

  }
}
