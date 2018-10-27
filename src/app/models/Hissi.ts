
export class Hissi {
  private currentKerros: number;
  private readonly maxPersons = 4;
  private readonly maxWeight = 250;
  private isHuollossa = false;
  private readonly huoltoVali = 3;

  constructor(kerroksia: number) {
    this.currentKerros = Math.floor(Math.random() * kerroksia + 1);
    this.asetaHuolto();
  }

  public getCurrentKerros(): number {
    return this.currentKerros;
  }

  public siirry(kerros: number) {
  this.currentKerros = kerros;
  }

private asetaHuolto() {
  const huoltoArpuri = Math.floor(Math.random() * this.huoltoVali + 1);
  this.isHuollossa = huoltoArpuri === this.huoltoVali;
 }

 public isHissiHuollossa(): boolean {
   return this.isHuollossa;
 }
}
