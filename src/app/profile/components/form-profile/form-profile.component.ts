import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input()
  options:string[] = [];

  backupForm: any;

  @Output()
  formEmit = new EventEmitter<FormGroup>();
  @Output()
  codeCp = new EventEmitter<string>();

  public isConfirmation: boolean = false;
  public isEdit: boolean = false;

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {},
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
    this.backupForm = this.form.value;
    this.isEdit = true;
    if (this.form.controls['cp']) {
      this.form.controls['cp'].enable();
      this.form.controls['colonia'].enable();
      this.form.controls['referencia'].enable();
    }
    else this.form.enable();
  }

  public emitForm() {
    this.formEmit.emit(this.form);
    this.isEdit = false;
    this.form.disable();
  }
  public codePostalChange() {
    const code: string = this.form.controls['cp'].value;
    if (code.length === 5) this.codeCp.emit(code);
  }
  public cancelEdit() {
    this.form.patchValue(this.backupForm);
    this.isEdit = false;
    this.form.disable();
  }
}
