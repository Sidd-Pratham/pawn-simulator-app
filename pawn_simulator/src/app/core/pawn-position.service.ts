import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PawnPositionService {
  constructor() { }
  rowPosition= new BehaviorSubject<number>(-1);
  columnPosition= new BehaviorSubject<number>(-1);
  arrow= new BehaviorSubject<number>(1);
  pawnColor= new BehaviorSubject<string>('white');
  pColor= new BehaviorSubject<string>('white');
  SColor= new BehaviorSubject<string>('black');
}
