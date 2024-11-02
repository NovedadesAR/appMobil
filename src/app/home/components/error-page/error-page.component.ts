import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {

  @Output()
  reload = new EventEmitter<boolean>();

  public emitReload(){
    this.reload.emit(true);
  }
}
