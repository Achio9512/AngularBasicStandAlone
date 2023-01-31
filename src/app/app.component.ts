import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
/*We need to be sure we have the selector in the index or initial HTML*/
@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  template: `
    <div class="app">
      <header class="header">
        <img src="/assets/img/logo.svg" alt="Ultimate Donuts" class="logo" />
      </header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .app {
        background-color: #fff;
        border-radius: 8px;
        max-width: 400px;
        width: 94%;
        margin: 25px auto;
        padding: 25px;
        border: 4px solid #ef9fc7;
      }
      .header {
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
      }
      .logo {
        width: 100px;
        height: 88px;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  message!: string;
  newMessage!: string;

  ngOnInit() {
    this.message = 'Hello World!';
  }

  handleClick(event: Event) {
    console.log(event?.target);
    console.log('Testing binding Sintax');
  }

  /*Is better to use ref variables #messageInput*/
  /* handleInput(event: Event) {
    const {value} = event.target as HTMLInputElement;
    this.newMessage = value;
    console.log(value);

    template:   
    <div class="app">
  <h1>{{newMessage}}</h1>
  <h1 (click)="handleClick($event)">{{"Testing binding Sintax"}}</h1>
  <input [value]="message" (input)="newMessage = messageInput.value" #messageInput>
  <p>{{messageInput.value}}</p>
  }*/
}
