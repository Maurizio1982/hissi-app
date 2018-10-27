import { Nappula } from './../../models/nappula';
import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { OhjausService } from '../../services/ohjaus.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kerros',
  templateUrl: './kerros.component.html',
  styleUrls: ['./kerros.component.scss']
})
export class KerrosComponent implements OnInit, DoCheck, OnDestroy {
  counter$: Observable<number>;
  ovenVoiAvata = false;
  kerrosNro: number;
  hissiHuollossa = false;
  hissinSijainti: number;
  napit: Nappula[] = [];
  tilattu = false;
  timerSubscription: Subscription;
  subscriptions = [];

  constructor(private ohjausService: OhjausService, private router: Router) {
  }

  ngOnInit() {
    this.ohjausService.setSecret('secret');
    // TODO Metodiksi
    this.ohjausService.liikkeessä ? this.kerrosNro = this.ohjausService.getHissinSijainti() :   this.kerrosNro = 0;
    this.napit = [new Nappula('arrow_drop_up', 'ylös'), new Nappula('arrow_drop_down', 'alas')];

    this.hissinSijainti = this.ohjausService.getHissinSijainti();
    this.checkIfFirstOrLast();

    this.subscriptions.push(this.ohjausService.getTilaTieto().subscribe(tilaTieto => this.hissiHuollossa = tilaTieto.poikkeus));
  }

  /**
   * Kun kerros on alin, ei näytetä alaspäin tilausnappia ja päinvastoin
   */
  private checkIfFirstOrLast(): void {
    if (this.kerrosNro === 0 ) {this.napit.find(nappi => nappi.suunta === 'alas').hidden = true; }
    if (this.kerrosNro === this.ohjausService.getKerroksia() ) {this.napit.find(nappi => nappi.suunta === 'ylös').hidden = true; }
  }

  ngDoCheck(): void {
   if (this.hissinSijainti === this.kerrosNro && this.napit.some(nappi => nappi.pressed)) {
     this.ovenVoiAvata = true;
   }
   if (this.hissinSijainti === this.kerrosNro) {
     if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
     }
   }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(element => element.unsubscribe());
  }

  /**
   * tilaa tilaa hissin valittuun kerrokseen parametrinaan myös menosuunta
   */
  public tilaa(nappula) {
    if (this.hissiHuollossa || nappula.pressed) { return; }

    nappula.pressed = true;
    this.tilattu = true;

    this.ohjausService.tilaaHissi(this.kerrosNro, nappula.suunta);

    this.timerSubscription = this.ohjausService.source.subscribe(val => {
    this.kerrosNro < this.hissinSijainti ?  --this.hissinSijainti : ++this.hissinSijainti;
    });
  }

  public astuHissiin() {
    this.router.navigate(['/InsideHissi']);
  }

}
