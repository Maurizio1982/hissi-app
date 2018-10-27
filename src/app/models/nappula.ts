export class Nappula {
  pressed = false;
  suunta: string;
  icon: string;
  nimi: string;
  kerros: number;
  hidden = false;
  disabled = false;

  constructor(icon: string, suunta?: string, kerros?: number, nimi?: string) {
    this.icon = icon;
    this.suunta = suunta;
    this.nimi = nimi;
    this.kerros = kerros;
  }
}
