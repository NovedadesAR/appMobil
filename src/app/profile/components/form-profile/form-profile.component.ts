import { Component, Input } from '@angular/core';
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

  isEdit: boolean = false;
  public editForm() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) this.form.enable();
    else this.form.disable();
  }
}
