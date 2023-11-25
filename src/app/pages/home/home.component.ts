import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponent } from '../../components/custom/custom.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CustomComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
