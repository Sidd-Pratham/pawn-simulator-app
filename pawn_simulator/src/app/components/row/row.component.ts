import { Component, Input } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-row',
  standalone: true,
  imports: [SquareComponent,CommonModule],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss'
})
export class RowComponent {
  @Input() rowIndex!:number;
  maxwidth:any[]=[0,1,2,3,4,5,6,7];
}
