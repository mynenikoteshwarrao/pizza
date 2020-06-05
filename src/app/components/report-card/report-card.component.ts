import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent implements OnInit {
  
  @Input() public heading:string;
  @Input() public value: number;
  @Input() public iconUrl:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
