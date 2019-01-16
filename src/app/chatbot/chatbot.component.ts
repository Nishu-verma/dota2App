import { Component, OnInit } from '@angular/core';
import {LexRuntime}  from 'aws-sdk';
import {Message} from '../messages';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  
  constructor() { }
  lex: LexRuntime;
  userInput: string = "";
  messages: Message[] = [];
  lexResponse: string ="Hi, what would you like to do?";
  
  ngOnInit() {
    this.messages.push(new Message(this.lexResponse,"Bot"));
  }

  postLexText() {
    var params = {
      botAlias: 'versionTwo', /* required */
      botName: 'dotaChatBot', /* required */
      inputText: 'Testing', /* required */
      userId: 'User', /* required */
      // requestAttributes: {
      //   '<String>': 'STRING_VALUE',
      //   /* '<String>': ... */
      // },
      // sessionAttributes: {
      //   '<String>': 'STRING_VALUE',
      //   /* '<String>': ... */
      // }
    };

    this.lex = new LexRuntime({
      accessKeyId: environment.normalKey,
      secretAccessKey: environment.secretKey,
      region: "us-east-1"
    }
    );
    params.inputText= this.userInput;
    this.lex.postText(params, (err, data)=>{
      if (err){
        console.log(err, err.stack); // an error occurred
      }
      else {
        console.log(data) // successful response
        this.lexResponse = data.message;
      }
      this.messages.push(new Message(this.userInput,"User"));
        this.userInput="";
      this.messages.push(new Message(this.lexResponse,"Bot"));
    });
  }

}
