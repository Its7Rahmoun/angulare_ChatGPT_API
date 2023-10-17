import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrls: ['./gpt.component.css']
})

export class GptComponent implements OnInit {
  queryFormGroup! : FormGroup;
  messeges =[
    {
      "role": "system",
      "content": "You are a helpful assistant."
    }
  ];

  resp : any;

  constructor(private fb : FormBuilder ,private httpcleint : HttpClient){}
  ngOnInit(): void {
    this.queryFormGroup = this.fb.group({
      query : this.fb.control("")
    });
  }
  handleAskGpt(){
    let url = "https://api.openai.com/v1/chat/completions";
    let header = new HttpHeaders().set("Authorization","Bearer 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");
    let paylod = {
      model: "gpt-3.5-turbo",
      messages: this.messeges
    };
    this.messeges.push({
      role:"user", content:this.queryFormGroup.value.query
    });
    this.httpcleint.post(url,paylod,{headers:header}).subscribe(
      {
        next :(responce)=>{  
          this.resp = responce;
          this.resp.choices.forEach((choice : any )=> {
            this.messeges.push({
              role:"system",
              content : choice.message.content
            })
          });
        },
        error:(err)=>{
        }
      }
    );
  }


}
