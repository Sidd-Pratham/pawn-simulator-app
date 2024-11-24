import { Component } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { CommonModule } from '@angular/common';
import { PawnPositionService } from '../../core/pawn-position.service';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pawn-simulator',
  standalone: true,
  imports: [RowComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './pawn-simulator.component.html',
  styleUrl: './pawn-simulator.component.scss'
})
export class PawnSimulatorComponent {
  numberForm: FormGroup;
  onceSubmitted:boolean=false;
  firstChance: boolean=false;
  logs:string[]=[];
  selectedColor: string = '#ffffff'; // Default color (black);
  selectedColor2: string = '#000000'; // Default color (black)

  constructor(private pawnPositionService:PawnPositionService,private fb: FormBuilder){
    this.numberForm = this.fb.group({
      numberInput: [
        0, 
        Validators.required, 
      ],
      numberInput2: [
        0, 
        Validators.required, 
      ],
      colorChoice: ['white', Validators.required], 
      direction: [null, Validators.required],     });
  }
  maxRows:any[]=[0,1,2,3,4,5,6,7];
  onColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedColor = input.value; // Update the color variable;
    this.pawnPositionService.pColor.next(input.value); 
  }
  onColorChange2(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedColor2 = input.value; // Update the color variable;
    this.pawnPositionService.SColor.next(input.value); 
  }

  RowChange(){

    this.pawnPositionService.rowPosition.next(this.pawnPositionService.rowPosition.value+1)
  }
  ColumnChange()
  {
    this.pawnPositionService.columnPosition.next(this.pawnPositionService.columnPosition.value+1)
  }
  move()
  {
    const cond1=this.pawnPositionService.rowPosition.value ==0 && this.pawnPositionService.arrow.value==2;
    const cond2=this.pawnPositionService.rowPosition.value==7 && this.pawnPositionService.arrow.value==4;
    const cond3=this.pawnPositionService.columnPosition.value ==0 && this.pawnPositionService.arrow.value==3;
    const cond4=this.pawnPositionService.columnPosition.value==7 && this.pawnPositionService.arrow.value==1;
    if(cond1 || cond2 || cond3 || cond4)
    {
      alert("At edge");
      return;
    }
    this.firstChance=false;
    this.logs.push('MOVE')
    if(this.pawnPositionService.arrow.value==1)
    {
      this.pawnPositionService.columnPosition.next(this.pawnPositionService.columnPosition.value+1)
    }
    else if(this.pawnPositionService.arrow.value==2)
    {
      this.pawnPositionService.rowPosition.next(this.pawnPositionService.rowPosition.value-1)
    }
    else if(this.pawnPositionService.arrow.value==3)
    {
      this.pawnPositionService.columnPosition.next(this.pawnPositionService.columnPosition.value-1)
    }
    else if(this.pawnPositionService.arrow.value==4)
    {
      this.pawnPositionService.rowPosition.next(this.pawnPositionService.rowPosition.value+1);
    }
  }
  rightClick()
  {
    // right -1 , down -2, left -3 , up -4
  
    const cond3=this.pawnPositionService.rowPosition.value ==0 && this.pawnPositionService.arrow.value==1;
    const cond4=this.pawnPositionService.columnPosition.value==7 && this.pawnPositionService.arrow.value==4;
    const cond5=this.pawnPositionService.columnPosition.value==0 && this.pawnPositionService.arrow.value==2;
    const cond6=this.pawnPositionService.rowPosition.value==7 && this.pawnPositionService.arrow.value==3;

    if(cond3 ||cond4 || cond5 || cond6)
    {
      alert("Action Not Allowed...");
      return;
    }
    this.logs.push('RIGHT')
    const pos=this.pawnPositionService.arrow.value;
    if(pos==4)
    this.pawnPositionService.arrow.next(1);
    else
    this.pawnPositionService.arrow.next(pos + 1)
  }
  leftClick()
  {
    const cond3=this.pawnPositionService.rowPosition.value ==0 && this.pawnPositionService.arrow.value==3;
    const cond4=this.pawnPositionService.columnPosition.value==7 && this.pawnPositionService.arrow.value==2;
    const cond5=this.pawnPositionService.columnPosition.value==0 && this.pawnPositionService.arrow.value==4;
    const cond6=this.pawnPositionService.rowPosition.value==7 && this.pawnPositionService.arrow.value==1;
    if(cond3 ||cond4 || cond5 || cond6)
      {
        alert("Action Not Allowed...");
        return;
      }
      this.logs.push('LEFT')
    const pos=this.pawnPositionService.arrow.value; 
    if(pos==1)
    this.pawnPositionService.arrow.next(4);
    else
    this.pawnPositionService.arrow.next(pos - 1)
  }

  // Dropdown options
  numberOptions: number[] = [0,1, 2, 3, 4, 5, 6, 7];



  // Getter for easier access in the template
  get numberInput() {
    return this.numberForm.get('numberInput');
  }

  // Method to handle form submission
  onSubmit() {
    if (this.numberForm.valid) {
      console.log(typeof this.numberForm.controls['numberInput'].value,this.numberForm.controls['numberInput2'].value)
      this.pawnPositionService.rowPosition.next(Number(this.numberForm.controls['numberInput'].value));
      this.pawnPositionService.columnPosition.next(Number(this.numberForm.controls['numberInput2'].value));
      console.log(this.pawnPositionService.rowPosition.value,this.pawnPositionService.columnPosition.value);
      this.onceSubmitted=true;
      this.firstChance=true;
      this.pawnPositionService.pawnColor.next(this.numberForm.controls['colorChoice'].value);
      this.pawnPositionService.arrow.next(this.numberForm.controls['direction'].value);
      let direction='';
          // right -1 , down -2, left -3 , up -4
          if(this.pawnPositionService.arrow.value==4)
            direction='NORTH'
      if(this.pawnPositionService.arrow.value==2)
      direction='SOUTH'
      if(this.pawnPositionService.arrow.value==3)
      direction='WEST'
      if(this.pawnPositionService.arrow.value==1)
      direction='EAST'
      this.logs.push(`PLACE ${this.pawnPositionService.rowPosition.value},${this.pawnPositionService.columnPosition.value},${direction},${this.pawnPositionService.pawnColor.value}`);

    } else {
     alert('Please select appropriate values');
    }
  }
  Report()
  {
    alert(`Pawn Position: ${this.pawnPositionService.rowPosition.value},${this.pawnPositionService.columnPosition.value}`)
  }
  Reset()
  {
    const confirmation = window.confirm('This action will reset the pawn and logs, Are you sure want to continue?');
    if (confirmation) {
     this.pawnPositionService.rowPosition.next(0);
     this.pawnPositionService.columnPosition.next(0);
     this.pawnPositionService.arrow.next(4);
     this.onceSubmitted=false;
    this.logs=[];

    } else {
      console.log('User cancelled');
    }
  }
  move2()
  {
    const cond1 = this.pawnPositionService.arrow.value==1 && this.pawnPositionService.columnPosition.value>=6;
    const cond2 = this.pawnPositionService.arrow.value==3 && this.pawnPositionService.columnPosition.value<=1;
    const cond3=this.pawnPositionService.arrow.value==2 && this.pawnPositionService.rowPosition.value<=1;
    const cond4=this.pawnPositionService.arrow.value==4 && this.pawnPositionService.rowPosition.value>=6;
    if(cond1 || cond2 || cond3 || cond4)
    {
      alert("Can't perform this operation due to edges");
      return;
    }
    this.firstChance=false;
    this.logs.push('MOVE2')
    if(this.pawnPositionService.arrow.value==1)
      {
        this.pawnPositionService.columnPosition.next(this.pawnPositionService.columnPosition.value+2)
      }
      else if(this.pawnPositionService.arrow.value==2)
      {
        this.pawnPositionService.rowPosition.next(this.pawnPositionService.rowPosition.value-2)
      }
      else if(this.pawnPositionService.arrow.value==3)
      {
        this.pawnPositionService.columnPosition.next(this.pawnPositionService.columnPosition.value-2)
      }
      else if(this.pawnPositionService.arrow.value==4)
      {
        this.pawnPositionService.rowPosition.next(this.pawnPositionService.rowPosition.value+2);
      }
  }
  disableNorth()
  {
    return this.numberForm.controls['numberInput'].value == 7
  }
  disableEast()
  {
    return this.numberForm.controls['numberInput2'].value == 7
  }
  disableWest()
  {
    return this.numberForm.controls['numberInput2'].value == 0
  }
  disableSouth()
  {
    return this.numberForm.controls['numberInput'].value == 0
  }
}
