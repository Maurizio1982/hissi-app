import { ReplaySubject, Observable } from 'rxjs';

export class Hissi {
  private currentKerros: number;
  private readonly maxPersons = 4;
  private readonly maxWeight = 250;
  private subsriptions = [];
  hissinKerrosSubject = new ReplaySubject<number>();

  constructor() {
    this.currentKerros = Math.floor(Math.random() * 6);
    this.hissinKerrosSubject.next(this.currentKerros);
  }

  getCurrentKerros(): number {
    return this.currentKerros;
  }

  siirry(kohde: number) {

    if (this.currentKerros > kohde) {

      const a = Array.from(Array(this.currentKerros).keys()).reverse();
      console.log(a);
     a.forEach(floor => {
       console.log(floor);
      this.nuku(2000);
      this.currentKerros = floor;
      this.hissinKerrosSubject.next(floor);
     });

    // lähetä tieto siirtymisestä
    }
  }

getNykyinenKerros(): Observable<number> {
  return this.hissinKerrosSubject.asObservable();
}


  nuku(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
  }
}
}
