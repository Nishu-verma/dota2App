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
  gameDuration : any;
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
      this.http.get("https://api.opendota.com/api/matches/"+this.matchId).subscribe((result)=>{
        this.result = result;
        console.log(this.result)
      });
  }
}
