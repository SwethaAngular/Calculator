import { Component, OnInit } from '@angular/core';
import { CalculateService } from '../Service/calculate.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  input: string = '';
  result: number | null = null;
  error: string | null = null;

  constructor(private stringCalculatorService: CalculateService) {}

  ngOnInit(): void {}
  calculate(): void {
    this.error = null;
    this.result = null;

  
    try {
      this.result = this.stringCalculatorService.add(this.input);
      console.log("Calculated result:", this.result); // This won't execute if there's an error
    } catch (e: any) {
      this.error = e.message;
      console.log("Error:", this.error); // Log the error message
    }
  }
  
  
}
