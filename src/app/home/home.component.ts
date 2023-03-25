import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  count = {
    countTo: 3452776,
    from: 0,
    duration: 1
};
countPeople = {
  countTo: 876543,
  from: 0,
  duration: 1
};
  countCountry = {
    countTo: 10,
    from: 0,
    duration: 1
};

}
