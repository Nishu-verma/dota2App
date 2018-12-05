import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  
  playerId ="138354184"
  playerResult : any;
  playerMatches : any;
  
  constructor(private http:HttpClient,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getRouteId();
  }
  getRouteId(){
    const routeId = +this.route.snapshot.paramMap.get('id');
    this.playerId = routeId.toString();
    if (this.playerId =="0"){
      this.playerId = "85169148";
    }
    else{
      this.getPlayerData();
    }
  }

  getPlayerData(){
    this.http.get("https://api.opendota.com/api/players/"+this.playerId).subscribe((result)=>{
      this.playerResult = result;
      console.log(this.playerResult)
    });
    this.http.get("https://api.opendota.com/api/players/"+this.playerId+"/recentMatches").subscribe((pMatches)=>{
      this.playerMatches = pMatches;
      console.log(this.playerMatches)
    });
  }
}
