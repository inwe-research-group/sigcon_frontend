import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  readonly BASE_URL: string =
    'https://sigcon-backend.onrender.com/api/v1/personas';

  constructor(private http: HttpClient) {}

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.BASE_URL}/listar`);
  }

  registrarPersona(form: any) {
    return this.http.post(`${this.BASE_URL}/agregar`, form);
  }

  eliminarPersona(persona: Persona) {
    return this.http.delete(`${this.BASE_URL}/eliminar`, { body: persona });
  }
}

//'http://localhost:8082/api/v1/personas';
