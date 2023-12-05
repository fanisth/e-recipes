import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-expiration-modal',
  templateUrl: './expiration-modal.component.html',
  styleUrls: ['./expiration-modal.component.css']
})
export class ExpirationModalComponent implements OnInit {

  @Input() public modalMessage : string = "";
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
