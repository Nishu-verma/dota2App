import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  matchId = "4252379739"
  result : any;
  radiantVictory:boolean;
  victory: string ="";
  
  constructor(private http:HttpClient,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getRouteId();
  }

  getRouteId(){
    const routeId = +this.route.snapshot.paramMap.get('id');
    this.matchId = routeId.toString();
    if (this.matchId =="0"){
      this.matchId = "4252379739";
    }
    else{
      this.getMatchData();
    }
  }
  getMatchData(){
      this.http.get("https://api.opendota.com/api/matches/"+this.matchId).subscribe((matchData)=>{
        this.result = matchData;
        console.log(this.result)
        this.radiantVictory = this.result.radiant_win ; // Why is this wrong?
        this.victoryFunction(this.radiantVictory);
      });
  }
  victoryFunction(a){
    if (a == true){
      this.victory = "Radiant Victory";
    }
    else{
      this.victory = "Dire Victory";
    }
  }
}
