import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})

export class ChatbotComponent implements OnInit {

  constructor(private service: DataShareService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.service.forChatBot()
    // .subscribe(res => {
    //   console.log(res,'gotit')
    // })
  }
  filterName: string | undefined;
  clear(asd: any) {
    console.log(asd)
    this.filterName = '';
  }
  userMessage: any = [];
  toStoreResFromJson: any;
  botMessage: any = [];
  botAndUser: any = [];
  lowerLetter: any;
  botchater = false;
  forAdditionalQuestions:any=[]
  time:any;
  sendMessage(data: any) {
    this.forAdditionalQuestions =[]
    if(data == undefined){
        
    }else{
      this.botchater = true;
    this.lowerLetter = data.toLowerCase();
    console.log(this.lowerLetter)
    // this.botAndUser = []
    this.userMessage = []
    this.botMessage = []
    this.userMessage.push({ "usermsg": data });
    this.service.forChatBot()
      .subscribe(res => {
        let dataOfRes  = res as any
        console.log(dataOfRes,'chatbot dataOfRes')

        this.toStoreResFromJson = dataOfRes
        console.log(this.toStoreResFromJson,'chatbot')
        for (let i = 0; i < this.toStoreResFromJson.length; i++) {
          //for(const[key,value] of Object.entries(this.toStoreResFromJson[i])){
          // console.log(key)
          if (this.toStoreResFromJson[i][this.lowerLetter]) {
            console.log('IF')
            
            this.botMessage.push({ "botmsg": this.toStoreResFromJson[i][this.lowerLetter] })
          } else {
            if (this.botMessage.length > 0) {
              break;
            }
            else {
              console.log('ELSE')
              this.botMessage.push({ "botmsg": this.toStoreResFromJson[i]['defaultmessage'] })
              for(const [key,value] of Object.entries(this.toStoreResFromJson[2])){
                console.log(key )
                this.forAdditionalQuestions.push(key)
              }
              
              
            }
          }
          // }
        }
        //console.log(this.userMessage, this.botMessage)
        this.botAndUser.push({ "user": this.userMessage, "bot": this.botMessage })
        const nd = new Date;
        this.time = nd.getHours() + ":" + nd.getMinutes()
        console.log(this.time, nd)
      })

    this.filterName = '';
    }
  }



  chatdata = false;
  bot = true;
  toOpenChat() {
    this.chatdata = true
    this.bot = false;
    this.botAndUser =[]
  }
  cancel() {
    this.chatdata = false
    this.bot = true;
    this.dialog.closeAll()
  }

}
