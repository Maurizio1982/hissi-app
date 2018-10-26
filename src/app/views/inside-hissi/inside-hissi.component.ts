import { Nappula } from './../../models/nappula';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OhjausService } from '../../services/ohjaus.service';
import { pipe, Observable, timer } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inside-hissi',
  templateUrl: './inside-hissi.component.html',
  styleUrls: ['./inside-hissi.component.scss']
})
export class InsideHissiComponent implements OnInit, OnDestroy {
  private readonly msg = 'Hälytys annettu! Pysy rauhallisena. Kyllä sieltä kohta joku tulee...';
  public kerrosNro: number;
  subscriptions = [];
  nappulat: Nappula[] = [];

  constructor(private router: Router, private ohjausService: OhjausService, public snackBar: MatSnackBar ) { }

  ngOnInit() {
    console.log(this.ohjausService.getKerroksia());
    for (let index = this.ohjausService.getKerroksia(); index >= 0; index--) {
      console.log(index);
      this.nappulat.push(new Nappula('', '', index, ''));
    }
    this.nappulat.push(new Nappula('notifications_active', '', -99, '') );
    this.kerrosNro = this.ohjausService.hissinSijainti;
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

public goTo(nappula: Nappula): void {
  console.log(nappula.kerros);
  nappula.pressed = true;
}

}
