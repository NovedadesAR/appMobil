import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Form } from '../../interfaces/Form.interface';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrl: './form-profile.component.css',
})
export class FormProfileComponent {

  @Input()
  form!: FormGroup;
  @Input()
  inputsForm: Form[] = [];

  @Output()
  formEmit = new EventEmitter<FormGroup>();
  @Output()
  codeCp = new EventEmitter<string>();

  public isConfirmation:boolean = false;
  public isEdit: boolean = false;

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        this.emitForm();
      },
    },
  ];

  public editForm() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) this.form.enable();
    else this.form.disable();
  }

  public emitForm(){
    this.formEmit.emit(this.form);
    this.isEdit = false;
    this.form.disable();
  }
  public codePostalChange(){
    const code:string = this.form.controls['cp'].value;
    if(code.length === 5)
      this.codeCp.emit(code);
  }
}
