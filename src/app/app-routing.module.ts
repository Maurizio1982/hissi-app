import { InsideHissiComponent } from './views/inside-hissi/inside-hissi.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KerrosComponent } from './views/kerros/kerros.component';
import {
  GuardService as Guard
} from './services/guard.service';

const routes: Routes = [
  { path: '', component: KerrosComponent },
  { path: 'InsideHissi',  component: InsideHissiComponent, canActivate: [Guard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
