import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {
  
  playerId ="138354184"
  playerResult : any;
  playerMatches : any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    
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
