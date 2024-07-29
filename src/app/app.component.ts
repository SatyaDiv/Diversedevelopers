import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'diversedevlops';
  personName: string = '';
  personEmail: string = '';

  onSubmit() {
    console.log('Name:', this.personName);
    console.log('Email:', this.personEmail);
  }
}
