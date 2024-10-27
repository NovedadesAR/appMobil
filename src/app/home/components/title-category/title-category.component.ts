import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-category',
  templateUrl: './title-category.component.html',
  styleUrl: './title-category.component.css'
})
export class TitleCategoryComponent {
  @Input()
  title:string = '';
}
