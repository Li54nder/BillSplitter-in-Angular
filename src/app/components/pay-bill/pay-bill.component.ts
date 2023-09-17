import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { People } from 'src/app/models/people';

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.scss']
})
export class PayBillComponent implements OnInit {
  personForm!: FormGroup;
  people: People[] = [ {name: "Dovla"} ];
  items: Item[] = [];

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.personForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  addPerson() {
    const person: People = {
      name: this.personForm.value.name
    }
    this.people.push(person);
    this.personForm.reset();
  }

  addItem() {
    const item = {
      id: this.items.length,
      price: 0,
      people: []
    }
    this.items.push(item);
  }

  updateItems(item: Item) {
    console.log(this.items);
    this.items = this.items.map(i => {
      if(i.id == item.id) {
        return item;
      }
      return i;
    })
    console.log(this.items);


  }

}
