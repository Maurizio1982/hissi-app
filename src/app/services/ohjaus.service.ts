import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Hissi } from '../models/hissi';
import { Subject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OhjausService implements OnInit, OnDestroy {
  private hissi = new Hissi();
  private subscriptions = [];
  private kerrosSubject = new ReplaySubject<number>();

  constructor() {
    this.subscriptions.push(this.hissi.getNykyinenKerros().subscribe(x => {

      this.kerrosSubject.next(x);
    }));
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  nykyinenKerros(): Observable<number> {
    return this.kerrosSubject.asObservable();
  }

  tilaaHissi(kohde: number) {
    this.hissi.siirry(kohde);
    const current = this.hissi.getCurrentKerros();

  }
}

