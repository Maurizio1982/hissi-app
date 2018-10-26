import { Nappula } from './../../models/nappula';
import { Component, OnInit, OnDestroy, SimpleChanges, DoCheck } from '@angular/core';
import { OhjausService } from '../../services/ohjaus.service';
import { pipe, Observable, timer, Subscription } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kerros',
  templateUrl: './kerros.component.html',
  styleUrls: ['./kerros.component.scss']
})
export class KerrosComponent implements OnInit, DoCheck, OnDestroy {
  counter$: Observable<number>;
  testi: number;
  tics = 0;
  ovenVoiAvata = false;
  kerrosNro = 0;
  hissiHuollossa = true;
  hissinSijainti: number;
  napit: Nappula[] = [];
  tilattu = false;
  timerSubscription: Subscription;
  subscriptions = [];

  constructor(private ohjausService: OhjausService, private router: Router) {

  }

  ngOnInit() {

    this.testi = this.ohjausService.hissinSijainti;
    // sisäinen




    this.napit = [new Nappula('arrow_drop_up', 'ylös'), new Nappula('arrow_drop_down', 'alas')];
    // this.hissinnSijainti = this.ohjausService.nykyinenKerros();
    this.subscriptions.push(this.ohjausService.nykyinenKerros().subscribe(data => {
      console.log(data.kerros);
      console.log(data.poikkeus);
      this.hissiHuollossa =  data.poikkeus;
      if (this.hissiHuollossa) {this.tilattu = true; }

      this.hissinSijainti = data.kerros;
    }));
  }

  ngDoCheck(): void {
   if (this.hissinSijainti === this.kerrosNro && this.napit.some(nappi => nappi.pressed)) {
     console.log('jee');
     this.ovenVoiAvata = true;
   }

   if (this.testi === this.kerrosNro) {
     this.timerSubscription.unsubscribe();
   }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(element => element.unsubscribe());
  }

  /**
   * tilaa tilaa hissin valittuun kerrokseen parametrinaan myös menosuunta
   */
  public tilaa(nappula) {
    console.log(nappula.suunta);
    if (this.tilattu || (this.kerrosNro === 0 && nappula.suunta === 'alas') ||
    (this.kerrosNro === this.ohjausService.getKerroksia() && nappula.suunta === 'ylös')) { return; }
    nappula.pressed = true;
    this.tilattu = true;
    this.ohjausService.tilaaHissi(this.kerrosNro, nappula.suunta);
    // jeiii tällä tavalla!!
    this.timerSubscription = this.ohjausService.source.subscribe(val => --this.testi);

    if (this.kerrosNro < this.hissinSijainti) {
      console.log('täällä');
      this.startTimerDown();
    } else {
      this.startTimerUp();
    }

  }

  startTimerDown() {
    this.counter$ = timer(0, 1000).pipe(
      take(this.hissinSijainti - this.kerrosNro),
      map(() => --this.hissinSijainti)

    );
  }

  startTimerUp() {
    this.counter$ = timer(0, 1000).pipe(
      take(this.kerrosNro - this.hissinSijainti),
      map(() => ++this.hissinSijainti)
    );
  }

  astuHissiin() {
    this.router.navigate(['/InsideHissi']);
  }

}
