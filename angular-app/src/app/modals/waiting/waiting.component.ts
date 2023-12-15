import { Component, Input,  OnInit } from '@angular/core';


@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  constructor() { }
  
  

  @Input() postData : FormData | undefined
  ngOnInit(): void {
  }
 
}