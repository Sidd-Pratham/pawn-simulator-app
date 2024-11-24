import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PawnSimulatorComponent } from './components/pawn-simulator/pawn-simulator.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PawnSimulatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pawn_simulator';
}
