import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor() { }

  add(numbers: string): number {
    if (!numbers) return 0;

    let delimiters = [',', '\n'];
    if (numbers.startsWith('//')) {
      const delimiterPart = numbers.substring(2, numbers.indexOf('\n'));
      delimiters.push(delimiterPart);
      numbers = numbers.substring(numbers.indexOf('\n') + 1);
    }

    const splitNumbers = numbers.split(new RegExp(`[${delimiters.join('')}]`));
    const negativeNumbers = splitNumbers.filter(num => parseInt(num) < 0);

    if (negativeNumbers.length > 0) {
      throw new Error(`negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }

    return splitNumbers.reduce((sum, num) => sum + (parseInt(num) || 0), 0);
  }
}
