export class Nappula {
  public pressed = false;
  public suunta: string;
  public icon: string;

  constructor(icon: string, suunta?: string) {
    this.icon = icon;
    this.suunta = suunta;
  }
}
