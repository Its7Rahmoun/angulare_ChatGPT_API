import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatBot';
  actions:Array<any>=[
    {
      "route":"/home","title":"home","icon":"house"
    },    {
      "route":"/gpt","title":"gpt","icon":"person"
    },
  ]

  currentAction : any;

  constructor(private route : Router){}
  handleRouteAction(action : any){
    this.currentAction=action;
    this.route.navigateByUrl(action.route);
  }
}
