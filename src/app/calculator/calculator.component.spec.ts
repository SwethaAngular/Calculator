import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateService } from '../Service/calculate.service';

describe('StringCalculatorService', () => {
  let service: CalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateService);
  });

  it('should return 0 for an empty string', () => {
    expect(service.add('')).toBe(0);
  });

  it('should return the number for a single number string', () => {
    expect(service.add('1')).toBe(1);
  });

  it('should return the sum for two numbers', () => {
    expect(service.add('1,2')).toBe(3);
  });

  it('should handle new line between numbers', () => {
    expect(service.add('1\n2,3')).toBe(6);
  });

  it('should handle different delimiters', () => {
    expect(service.add('//;\n1;2')).toBe(3);
  });

  it('should throw an error for negative numbers', () => {
    expect(() => service.add('1,-2,3')).toThrowError('negative numbers not allowed: -2');
  });

  it('should throw an error for multiple negative numbers', () => {
    expect(() => service.add('1,-2,-3')).toThrowError('negative numbers not allowed: -2, -3');
  });
});