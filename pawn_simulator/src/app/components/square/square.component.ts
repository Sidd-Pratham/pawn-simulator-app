import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PawnPositionService } from '../../core/pawn-position.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent {
  
@Input() colIndex!:number;
@Input() rowIndex!:number;
pawnRowPosition!:number;
pawnColPosition!:number;
pawnColor!:string;
arraowpos!:number;
primaryColor:string='white';
  constructor(private pawnPositionService:PawnPositionService,private cdr:ChangeDetectorRef){
    this.pawnPositionService.rowPosition.subscribe((data)=>{
      this.pawnRowPosition=data;
    });
    this.pawnPositionService.columnPosition.subscribe((data)=>{
      this.pawnColPosition=data;
    });
    this.pawnPositionService.arrow.subscribe((data)=>{
      this.arraowpos=data;
    });
    this.pawnPositionService.pawnColor.subscribe((data)=>{
      this.pawnColor=data;
    });
    this.pawnPositionService.pColor.subscribe((data)=>{
      document.documentElement.style.setProperty('--primary-background-color', data);
    });
    this.pawnPositionService.SColor.subscribe((data)=>{
      document.documentElement.style.setProperty('--secondary-background-color', data);
    })
  }
}
