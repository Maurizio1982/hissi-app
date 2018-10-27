import { Injectable, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { Hissi } from '../models/hissi';
import { Subject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { pipe,  timer } from 'rxjs';
import { map, take, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OhjausService implements OnInit, OnDestroy, DoCheck {
  counter$: Observable<number>;
  private secret: string;
  public source;
  public liikkeessä = false;
  private kerroksia = 5;
  public hissinSijainti: number;
  private hissi = new Hissi(this.kerroksia);
  private subscriptions = [];
  private tilaTietoSubject = new ReplaySubject<{poikkeus: boolean}>();

  constructor() {
   // this.subscriptions.push(this.hissi.getNykyinenKerros().subscribe(x => {
      console.log('kerros:', this.hissi.getCurrentKerros());
      console.log('huollossa:', this.hissi.isHissiHuollossa());
      this.tilaTietoSubject.next({poikkeus: this.hissi.isHissiHuollossa()});
      this.hissinSijainti = this.hissi.getCurrentKerros();
   //
  }

  ngOnInit() {


}


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  getTilaTieto(): Observable<{poikkeus: boolean}> {
    return this.tilaTietoSubject.asObservable();
  }

  tilaaHissi(kohde: number, suunta: string) {


    console.log('tilattu', this.hissinSijainti);
    this.startTimer();
    this.hissi.siirry(kohde);

    this.hissinSijainti = this.hissi.getCurrentKerros();
    console.log('hissinsijainti:', this.hissinSijainti);

  }

  ngDoCheck(): void {
    if (this.hissinSijainti) {
      console.log(this.hissinSijainti);
    }
   }

  public getKerroksia(): number {
    console.log(this.kerroksia);
    return this.kerroksia;
  }

  public liikuKerrokseen(kerros: number): void {
    console.log(kerros);
    this.startTimer();
    this.liikkeessä = true;
    this.hissi.siirry(kerros);
    this.hissinSijainti = this.hissi.getCurrentKerros();
    console.log(this.hissinSijainti);
  }

getHissinSijainti() {
  return this.hissinSijainti;
}

private startTimer() {
  console.log('timer painettu');
this.source = timer(0, 1000);
}

setSecret(salaisuus: string): void {
  this.secret = salaisuus;
}

isAuthenticated() {
  return this.secret;
}

}

