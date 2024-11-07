import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toas-form',
  templateUrl: './toas-form.component.html',
  styleUrl: './toas-form.component.css'
})
export class ToasFormComponent {

  @Input()
  public isOpen: boolean = false;
}
