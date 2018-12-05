import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  matchId = "4252379739"
  result : any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }
  getMatchData(){
      this.http.get("https://api.opendota.com/api/matches/"+this.matchId).subscribe((result)=>{
        this.result = result;
        console.log(this.result)
      });
  }
}
