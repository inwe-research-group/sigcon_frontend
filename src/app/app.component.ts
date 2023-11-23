import { PersonaService } from './services/persona.service';
import { Component } from '@angular/core';
import { Persona } from './model/persona';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sigcon_frontend';
  personaArray: Persona[] = [];
  page: number;
  personaForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private personaService: PersonaService
  ) {
    this.page = 1;
    this.personaForm = this.formbuilder.group({
      id_persona: [''],
      apellido_paterno: [''],
      apellido_materno: [''],
      nombres: [''],
    });
  }

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getPersonas().subscribe(
      (result: any) => {
        console.log('Result', result);
        this.personaArray = result;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia...',
          text: '!Ah ocurrido un error!',
        });
      }
    );
  }
  registrarPersona(): void {
    this.personaService.registrarPersona(this.personaForm.value).subscribe(
      (result: any) => {},
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia...',
          text: '!Ah ocurrido un error al registrar persona!',
        });
      }
    );
    Swal.close();
    Swal.fire({
      icon: 'success',
      title: '¡Registro Exitoso! - registrarPersona',
      text: '!Se registro exitosamente los datos de la persona!',
    });
    this.personaForm.reset();
  }

  eliminarPersona(persona: Persona): void {
    console.log('Result', persona);
    this.personaService.eliminarPersona(persona).subscribe(
      (result: any) => {},
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia...',
          text: '!Ah ocurrido un error al eliminar persona!',
        });
      }
    );
    Swal.close();
    Swal.fire({
      icon: 'success',
      title: '¡Eliminacion Exitosa! - eliminarPersona',
      text: '!Se elimino exitosamente los datos de la persona!',
    });
  }

  editarPersona(persona: Persona): void {
    console.log('Result', persona);
    this.personaForm.setValue({
      id_persona: persona.id_persona,
      apellido_paterno: persona.apellido_paterno,
      apellido_materno: persona.apellido_materno,
      nombres: persona.nombres,
    });
  }
}
