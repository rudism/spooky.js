export class rgbColor {
  public r: number = 0;
  public g: number = 0;
  public b: number = 0;

  constructor(hex: string) {
    const regex: RegExp = hex.length > 4
      ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
      : /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const repeat = hex.length > 4 ? 1 : 2;

    const result = regex.exec(hex);

    if (result) {
      this.r = parseInt(result[1].repeat(repeat), 16);
      this.g = parseInt(result[2].repeat(repeat), 16);
      this.b = parseInt(result[3].repeat(repeat), 16);
    }
  }

  public toString(): string {
    return `${this.r}, ${this.g}, ${this.b}`;
  }
}
