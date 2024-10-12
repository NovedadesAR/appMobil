import { Component, Input } from '@angular/core';

interface DataTitleAndDescription{
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-title-and-description',
  templateUrl: './title-and-description.component.html',
  styleUrl: './title-and-description.component.css'
})
export class TitleAndDescriptionComponent {

  @Input()
  data!:DataTitleAndDescription;
}
