import { InsideHissiComponent } from './views/inside-hissi/inside-hissi.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KerrosComponent } from './views/kerros/kerros.component';

const routes: Routes = [
  { path: '', component: KerrosComponent },
  { path: 'InsideHissi',  component: InsideHissiComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
