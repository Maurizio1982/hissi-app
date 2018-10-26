export class Nappula {
  public pressed = false;
  public suunta: string;
  public icon: string;
  public nimi: string;
  public kerros: number;

  constructor(icon: string, suunta?: string, kerros?: number, nimi?: string) {
    this.icon = icon;
    this.suunta = suunta;
    this.nimi = nimi;
    this.kerros = kerros;
  }
}
