import { Service } from "typedi";
const HttpExecption = require("http-errors");

@Service()
export class MathService {
  constructor() {}

  lcmOfArray(numbers: string[]): number {
    try {
      const mapNumber = numbers.map((n) => Number(n));
      return mapNumber.reduce((prev, curr) => this.lcm(prev, curr));
    } catch (error) {
      console.log(error);
    }
  }

  incrementNumber(number): number {
    const parsedNumber = parseInt(number, 10);
    if (isNaN(parsedNumber)) {
      throw new HttpExecption(403, "Invalid input");
    }
    const result: number = parsedNumber + 1;
    return result;
  }
  // private methods

  private gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  private lcm(a: number, b: number): number {
    return (a * b) / this.gcd(a, b);
  }
}
