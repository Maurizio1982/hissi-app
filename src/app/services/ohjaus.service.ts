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

  public source;

  private kerroksia = 5;
  public hissinSijainti: number;
  private hissi = new Hissi(this.kerroksia);
  private subscriptions = [];
  private kerrosSubject = new ReplaySubject<{kerros: number, poikkeus: boolean}>();

  constructor() {
   // this.subscriptions.push(this.hissi.getNykyinenKerros().subscribe(x => {
      console.log('kerros:', this.hissi.getCurrentKerros());
      console.log('huollossa:', this.hissi.isHissiHuollossa());
      this.kerrosSubject.next({kerros: this.hissi.getCurrentKerros(), poikkeus: this.hissi.isHissiHuollossa()});
      this.hissinSijainti = this.hissi.getCurrentKerros();
   //
  }

  ngOnInit() {


}


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  nykyinenKerros(): Observable<{kerros: number, poikkeus: boolean}> {
    return this.kerrosSubject.asObservable();
  }

  tilaaHissi(kohde: number, suunta: string) {
    // this.hissi.siirry(kohde);


    console.log('tilattu', this.hissinSijainti);
    this.startTimer();
    this.hissi.siirry(kohde);

    this.hissinSijainti = this.hissi.getCurrentKerros();
    console.log(this.hissinSijainti);


/*     if (kohde < this.hissinSijainti) {
      console.log('down');
      this.startTimerDown(kohde);
      console.log(this.hissinSijainti);
    } else {
      this.startTimerUp(kohde);
    } */



// timeri tänne :
// 1. siirrä hissiä yksi pykälä
// 2 . tiedota halukkaita

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

  /* startTimerDown(kohde: number) {
    console.log('kutsuttu');
    this.counter$ = timer(0, 1000).pipe(
      take(this.hissinSijainti - kohde),
      map(() => --this.hissinSijainti, this.kerrosSubject.next(this.hissinSijainti)
      )
    );


  }

  startTimerUp(kohde: number) {
    this.counter$ = timer(0, 1000).pipe(
      take(kohde - this.hissinSijainti),
      tap(x => console.log(this.hissinSijainti, kohde)),
      map(() => ++this.hissinSijainti)
    );
  } */

private startTimer() {
this.source = timer(0, 1000);
}

}

