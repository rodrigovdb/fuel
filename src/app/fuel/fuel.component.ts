import { Component, OnInit }  from '@angular/core'
import { FuelType }           from '../fuelType'

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {

  ethanol: FuelType = {
    name:     'Etanol',
    price:    null,
    consume:  null,
    value:    null
  }

  gasoline: FuelType = {
    name:     'Gasolina',
    price:    null,
    consume:  null,
    value:    null
  }

  constructor() { }

  ngOnInit() {
  }

  run(){
    this.ethanol.consume  = this.maskDecimal(this.ethanol.consume)
    this.gasoline.consume = this.maskDecimal(this.gasoline.consume)

    this.ethanol.price  = this.maskCurrency(this.ethanol.price)
    this.gasoline.price = this.maskCurrency(this.gasoline.price)

    this.calculate(this.ethanol)
    this.calculate(this.gasoline)
  }

  maskDecimal(value){
    if(value == null){
      return
    }

    value     = value.replace(/\D/g, '')
    value     = value.replace(/^0+/g, '')
    var size  = value.length

    if(size < 3){
      while(value.length < 2){
        value = "0"+value
      }
      value = "0," + value

      size  = value.length
      value = value.replace(/\D/g, '')
    }

    var absolute  = value.substr(0, size - 2)
    var decimal   = value.substr(size -2)
    value         = absolute.toString() + "," + decimal.toString()

    return value
  }

  maskCurrency(value){
    if(value == null){
      return
    }
    value         = this.padNumber(value)
    var size      = value.length
    var absolute  = value.substr(0, size - 2)
    var decimal   = value.substr(size -2)
    value         = absolute.toString() + "," + decimal.toString()

    return value
  }

  padNumber(value){
    if(value == null){
      return
    }

    value     = value.replace(/\D/g, '')
    value     = value.replace(/^0+/g, '')
    var size  = value.length

    switch(size){
      case 0:
        value = "000"
        break
      case 1:
        value = "00" + value
        break
      case 2:
        value = "0" + value
        break
    }

    return value
  }

  calculate(item) {
    if(item.price == null || item.consume == null){
      return
    }

    // Cast from string to float
    var price = parseFloat(item.price.replace(/,/, '.'))
    var consume = parseFloat(item.consume.replace(/,/, '.'))

    if(price > 0 && consume > 0){
      item.value = price / consume
    }
    else {
      item.value = 0
    }
  }
}
