import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  add(numbers: string): number {
    // Return 0 for empty input
    if (!numbers) {
      return 0;
    }

    // Default delimiter
    let delimiter = ',';

    // Check for custom delimiters
    if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      // Get the custom delimiter (supporting single character)
      delimiter = numbers.substring(2, delimiterEndIndex).replace(/[\[\]]/g, ''); // Remove brackets if present
      numbers = numbers.substring(delimiterEndIndex + 1); // Get the numbers part
    }

    // Replace all symbols with a space and split numbers using defined delimiters
    const sanitizedInput = numbers.replace(/[^0-9,;\n]/g, ''); // Remove all non-numeric characters except delimiters
    const numList = this.splitNumbers(sanitizedInput, `${delimiter}|\\n`);

    return this.sum(numList);
  }

  private splitNumbers(numbers: string, divider: string): string[] {
    return numbers.split(new RegExp(divider)).map(num => num.trim()); // Split using regex and trim spaces
  }

  private convertToInt(num: string): number {
    return parseInt(num, 10); // Convert string to integer
  }

  private sum(numbers: string[]): number {
    let total = 0;
    let negativeString = '';

    for (const number of numbers) {
      // Split the number into individual digits and sum them
      const digitSum = this.sumDigits(number);

      // Handle negative numbers
      if (digitSum < 0) {
        negativeString += negativeString ? `, ${number}` : number; // Collect negative numbers
      }

      // Ignore numbers greater than or equal to 1000
      if (digitSum < 1000) {
        total += digitSum; // Sum valid numbers
      }
    }

    // Throw error for negatives
    if (negativeString) {
      throw new Error(`Negatives not allowed: ${negativeString}`);
    }

    return total; // Return the total sum
  }

  private sumDigits(num: string): number {
    return num.split('').reduce((sum, char) => {
      const digit = parseInt(char, 10);
      return !isNaN(digit) ? sum + digit : sum; // Add only valid digits
    }, 0);
  }
}
