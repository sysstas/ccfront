import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor() { }

  getCities(){
    return this.cities
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


