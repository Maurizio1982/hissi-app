import { Nappula } from './../../models/nappula';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OhjausService } from '../../services/ohjaus.service';
import { pipe, Observable, timer, Subscription } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inside-hissi',
  templateUrl: './inside-hissi.component.html',
  styleUrls: ['./inside-hissi.component.scss']
})

export class InsideHissiComponent implements OnInit, OnDestroy {
  private readonly msg = 'Hälytys annettu! Pysy rauhallisena. Kyllä sieltä kohta joku tulee...';
  public hissinSijainti: number;
  public ovenVoiAvata = true;
  subscriptions = [];
  timerSubscription: Subscription;
  nappulat: Nappula[] = [];

  constructor(private router: Router, private ohjausService: OhjausService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    for (let index = this.ohjausService.getKerroksia(); index >= 0; index--) {
      this.nappulat.push(new Nappula('', '', index, ''));
    }
    this.nappulat.push(new Nappula('notifications_active', '', -99, ''));
    this.nappulat.find(nappi => nappi.kerros === 0).nimi = 'Katutaso';
    this.hissinSijainti = this.ohjausService.getHissinSijainti();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(element => element.unsubscribe());
  }

  public poistuHissista() {
    this.router.navigate(['/']);
  }

  public teeHaly(): void {
    this.snackBar.open(this.msg, 'Asia kunnossa', {
      duration: 4000,
    });
  }

  public meneKerrokseen(nappula: Nappula): void {
    nappula.pressed = true;
    this.nappulat.forEach(nappi => nappi.disabled = true);
    this.ovenVoiAvata = false;

    this.ohjausService.liikuKerrokseen(nappula.kerros);

    this.timerSubscription = this.ohjausService.source.subscribe(val => {
     if (this.hissinSijainti === nappula.kerros) {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();

        nappula.pressed = false;
        this.ovenVoiAvata = true;

        this.nappulat.forEach(nappi => nappi.disabled = false);
        return;
      }
    }
      this.hissinSijainti <= nappula.kerros ? ++this.hissinSijainti : --this.hissinSijainti;
    });
  }

}
