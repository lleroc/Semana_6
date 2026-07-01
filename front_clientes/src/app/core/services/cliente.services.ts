import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { variables_ambiente} from '../../../environments/environment.developer'
import { Observable } from 'rxjs';
import { Icliente } from '../interfaces/icliente';
@Injectable({
  providedIn: 'root',
})
export class ClienteServices {
  apiurl=variables_ambiente.apiBaseUrl
  constructor(private readonly http:HttpClient) {}
  todos():Observable<Icliente[]>{
    return this.http.get<Icliente[]>(`${this.apiurl}/clientes`)
  }
  uno(id:number):Observable<Icliente>{
    return this.http.get<Icliente>(`${this.apiurl}/clientes/${id}`)
  }
  nuevo(cliente:Icliente):Observable<Icliente>{
    return this.http.post<Icliente>(`${this.apiurl}/clientes`,cliente)
  }
  actualizar(id:number, cliente:Icliente):Observable<Icliente>{
    return this.http.patch<Icliente>(`${this.apiurl}/clientes/${id}`, cliente)
  }
  eliminar(id:number):Observable<{message: string}>{
    return this.http.delete<{message: string}>(`${this.apiurl}/clientes/${id}`)
  }
}
