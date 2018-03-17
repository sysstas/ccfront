import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  
  cities = [
    {
      city: "Dnipro",
      masters: [
        { id: 1,
          name: "Andrew",
          rating: 5
        },
        { id: 2,
          name: "Victor",
          rating: 3
        }       
      ]
    },
    {
      city: "Zhytomyr",
      masters: [
        { id: 3,
          name: "Orest",
          rating: 5
        },
        { id: 4,
          name: "Lyashko",
          rating: 2
        }        
      ]
    }
  ]
}
