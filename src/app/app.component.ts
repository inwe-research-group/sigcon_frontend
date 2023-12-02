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
    console.log('validarPersona', this.personaForm.value);
    if (
      this.personaForm.get('apellido_paterno')?.value == '' ||
      this.personaForm.get('apellido_materno')?.value == '' ||
      this.personaForm.get('nombres')?.value == '' ||
      this.personaForm.get('apellido_paterno')?.value == null ||
      this.personaForm.get('apellido_materno')?.value == null ||
      this.personaForm.get('nombres')?.value == null
    ) {
      console.log('campos vacios', this.personaForm.value);
      Swal.close();
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia...',
        text: '!Verifique alguna de las casillas no contienen datos correctos y/o completos!..., se cancela la operacion.',
      }); //end swal fire
    } //end if
    else {
      this.insertarPersona();
    }
  }
  insertarPersona(): void {
    Swal.fire({
      title: 'Desea Guardar la persona?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.registrarPersona(this.personaForm.value).subscribe(
          (result: any) => {
            this.personaForm.reset();
            this.getPersonas();
          },
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
      } else if (result.isDenied) {
        Swal.fire('Se cancela la operacion', '', 'info');
      }
    });
  }

  eliminarPersona(persona: Persona): void {
    console.log('Result', persona);
    Swal.fire({
      title: 'Esta seguro de Eliminar la persona seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.eliminarPersona(persona).subscribe(
          (result: any) => {
            this.getPersonas();
          },
          (err: any) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Advertencia...',
              text: '!Ah ocurrido un error al eliminar persona!',
            });
          }
        ); //end subscribe
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: '¡Eliminacion Exitosa! - eliminarPersona',
          text: '!Se elimino exitosamente los datos de la persona!',
        });
      } //end if
    });
  }

  editarPersona(persona: Persona): void {
    console.log('Result', persona);
    Swal.fire({
      title: 'Esta seguro de Editar los datos de la persona seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaForm.setValue({
          id_persona: persona.id_persona,
          apellido_paterno: persona.apellido_paterno,
          apellido_materno: persona.apellido_materno,
          nombres: persona.nombres,
        });
      } //end if
    }); //end swal.fire
  }
  Cancelar(): void {
    Swal.fire({
      title: 'Desea Cancelar la operacion?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaForm.reset();
        this.getPersonas();
      }
    });
  }
}
