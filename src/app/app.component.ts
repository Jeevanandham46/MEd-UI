import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatbotComponent } from './chatbot/chatbot.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medAppNg';
  constructor(private dialog:MatDialog){}
  openChatBot(){
    console.log('chatbot')
this.dialog.open(ChatbotComponent)
  }
}
