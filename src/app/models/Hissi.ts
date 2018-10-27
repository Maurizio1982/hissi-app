import { ReplaySubject, Observable } from 'rxjs';

export class Hissi {
  private currentKerros: number;
  private readonly maxPersons = 4;
  private readonly maxWeight = 250;
  private subsriptions = [];
  private isHuollossa = false;
  private huoltoVali = 5;
  hissinKerrosSubject = new ReplaySubject<number>();

  constructor(kerroksia: number) {
    this.currentKerros = Math.floor(Math.random() * kerroksia + 1);
    this.asetaHuolto();
  }

  getCurrentKerros(): number {
    return this.currentKerros;
  }

  siirry(kerros: number) {
    console.log(kerros);
  this.currentKerros = kerros;
  console.log(this.currentKerros);
 /*    if (this.currentKerros > kohde) {

      const a = Array.from(Array(this.currentKerros).keys()).reverse();
      console.log(a);
     a.forEach(floor => {
       console.log(floor);
      this.nuku(2000);
      this.currentKerros = floor;
      this.hissinKerrosSubject.next(floor);
     }); */

    // lähetä tieto siirtymisestä
   // }
  }

/* getNykyinenKerros(): Observable<number> {
  return this.hissinKerrosSubject.asObservable();
} */


/*   nuku(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
  }
} */

private asetaHuolto() {
  const huoltoArpuri = Math.floor(Math.random() * this.huoltoVali + 1);
  console.log('arpa:', huoltoArpuri);
  console.log('tulos:', huoltoArpuri === this.huoltoVali);
  this.isHuollossa = huoltoArpuri === this.huoltoVali;
  console.log('huollossa:', this.isHuollossa);
 }

 public isHissiHuollossa(): boolean {
   return this.isHuollossa;
 }
}
