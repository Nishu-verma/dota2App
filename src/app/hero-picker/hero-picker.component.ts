import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location, KeyValue } from '@angular/common';


@Component({
  selector: 'app-hero-picker',
  templateUrl: './hero-picker.component.html',
  styleUrls: ['./hero-picker.component.css']
})
export class HeroPickerComponent implements OnInit {

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location) { }

  heroData: Array<any>[] = [];
  heroDataStored: any;

  selectedHeroes: Array<any>[] = [];
  bannedHeroes: Array<any>[] = [];
  heroMatchup: Array<any>[] = [];
  testMap = new Map();

  ngOnInit() {
    this.getHeroData();
  }

  getHeroData() {
    this.http.get("https://api.opendota.com/api/heroes")
      .subscribe((result) => {
        this.heroData = result as Array<any>[];
        this.heroDataStored = result;

        console.log(this.heroData)
        console.log(this.heroDataStored)

      });

  }
  getMatchupData(heroId) {
    this.http.get("https://api.opendota.com/api/heroes/" + heroId + "/matchups")
      .subscribe((result) => {
        this.heroMatchup = result as Array<any>[];
        console.log(this.heroMatchup);
        this.processMatchup(this.heroMatchup, this.heroDataStored);
      });
  }

  selectHero = function (hero) {
    const index = this.heroData.indexOf(hero);
    this.getMatchupData(hero.id);
    this.heroData.splice(index, 1);
    // console.log(index);
    this.selectedHeroes.splice(-1, 0, hero);
    // console.log(this.selectedHeroes);
  }
  banHero = function (hero) {
    const index = this.heroData.indexOf(hero);
    this.heroData.splice(index, 1);
    this.bannedHeroes.splice(-1, 0, hero);
  }
  undoEnemy = function (hero) {
    const index = this.selectedHeroes.indexOf(hero);
    this.selectedHeroes.splice(index, 1);
    this.heroData.splice(-1, 0, hero);
  }
  processMatchup(heromatchupData, heroDataStored) {
    var total = 0;
    heromatchupData.forEach(element => {
      total += parseInt(element.games_played)
    });
    heromatchupData.forEach(element => {
      var score = 0;
      score = 100/5 - (100 * parseInt(element.wins) / parseInt(element.games_played) / 5);
      var name = "";
      heroDataStored.forEach(hero => {
        if (parseInt(hero.id) == parseInt(element.hero_id)) {
          name = hero.localized_name;
        }
      });
      console.log(heroDataStored);
      if (name == "") {
        name = element.hero_id
      }
      if (this.testMap.has(name)) {
        this.testMap.set(name, this.testMap.get(name) + score);
      }
      else {
        this.testMap.set(name, score)
      }
      console.log(this.testMap);
    }
    );
  }
  // descOrder = (a, b) => {
  //   if(a.value < b.value) return b.value;
  // }
}
