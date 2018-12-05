import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  { path: 'player-details', component: PlayerDetailsComponent},
  { path: 'match-details', component: ViewComponent },
];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
