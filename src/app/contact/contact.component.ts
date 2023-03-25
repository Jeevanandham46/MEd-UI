import { Component, OnInit } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}
position:any;
  ngOnInit() {
    this.position = 'left'
    this.firstFormGroup = this._formBuilder.group({
      Name: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      Email: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      Query: ['', Validators.required],
    });
  }
  next(){

  }

}
