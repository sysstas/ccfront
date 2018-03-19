import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor() { }

  getCities(){
    return this.cities
  }

  getMasters(){
    return this.masters
  }

  addCity(cityName: string){
    this.cities.push({city: cityName,
      masters: []
    }) 
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

  masters = [
    { id: 1,
      name: "Andrew",
      city: "Dnipro",
      rating: 5,
      busy: [
        {
        date:"Mon Mar 19 2018 00:00:00 GMT+0200 (EET)",
        time: [8,9,10]
        }
      ]        
    },
    { id: 2,
      name: "Victor",
      city: "Dnipro",
      rating: 3,
      busy: [
        {
        date:"Mon Mar 19 2018 00:00:00 GMT+0200 (EET)",
        time: [10,11,12]
        }
      ]        
    },         
    { id: 3,
      name: "Orest",
      city: "Zhytomyr",
      rating: 5,
      busy: [
        {
        date:"Mon Mar 19 2018 00:00:00 GMT+0200 (EET)",
        time: [13,14,15]
        }
      ]        
    },
    { id: 4,
      name: "Lyashko",
      city: "Zhytomyr",
      rating: 2,
      busy: [
        {
        date:"Mon Mar 19 2018 00:00:00 GMT+0200 (EET)",
        time: [8,9,10,16,17]
        }
      ]        
    }        
  ]

}




