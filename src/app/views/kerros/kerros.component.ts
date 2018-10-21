import { Nappula } from './../../models/nappula';
import { Component, OnInit, OnDestroy, SimpleChanges, DoCheck } from '@angular/core';
import { OhjausService } from '../../services/ohjaus.service';
import { pipe, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-kerros',
  templateUrl: './kerros.component.html',
  styleUrls: ['./kerros.component.scss']
})
export class KerrosComponent implements OnInit, DoCheck, OnDestroy {
  ovenVoiAvata = false;
  kerrosNro = 0;
  hissinSijainti: Observable<number>;
  napit: Nappula[] = [];
  tilattu = false;
  subscriptions = [];

  constructor(private ohjausService: OhjausService) { }

  ngOnInit() {
    this.napit = [new Nappula('arrow_drop_up', 'ylös'), new Nappula('arrow_drop_down', 'alas')];
    this.hissinSijainti = this.ohjausService.nykyinenKerros();
 /*    this.subscriptions.push(this.ohjausService.nykyinenKerros().pipe().subscribe(kerros => {
      console.log(kerros);
      this.hissinSijainti = kerros;
    })); */
  }

  ngDoCheck(): void {
   if (this.hissinSijainti.subscribe(x => x === 0) && this.napit.some(nappi => nappi.pressed)) {
     console.log('jee');
     this.ovenVoiAvata = true;
   }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(element => element.unsubscribe());
  }

  /**
   * tilaaHissi tilaa hissin valittuun kerrokseen parametrinaan myös menosuunta
   */
  public tilaaHissi(nappula) {
    if (this.tilattu) { return; }
    nappula.pressed = true;
    this.tilattu = true;
    this.ohjausService.tilaaHissi(this.kerrosNro);
  }
}
