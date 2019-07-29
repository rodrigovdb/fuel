import { Component, OnInit }  from '@angular/core';
import { FuelType }           from '../fuelType';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {

  ethanol: FuelType = {
    name:     'Etanol',
    price:    0.00,
    consume:  0.00,
    value:    null
  };

  gasoline: FuelType = {
    name:     'Gasolina',
    price:    0.00,
    consume:  0.00,
    value:    null
  };

  constructor() { }

  ngOnInit() {
  }

  calculate(item) {
    if(item.price > 0 && item.consume > 0){
      item.value = item.price / item.consume;
    }
  }

  build() {
    this.calculate(this.ethanol);
  }
}
