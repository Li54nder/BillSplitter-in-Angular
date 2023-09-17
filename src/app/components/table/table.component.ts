import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'pay'];
  dataSource: any[] = [];
  itemsTMP: Item[] = [];
  @Input()
  set items(items: Item[]) {
    this.itemsTMP = items;
    let dataValues: any = {};
    items.forEach((item) => {
      item.people.forEach((person) => {
        console.log(person);

        if (!dataValues[person]) {
          dataValues[person] = { price: 0 };
        }
        dataValues[person] = {
          price: dataValues[person]['price'] + item.price / item.people.length,
        };
      });
    });

    const data = Object.keys(dataValues).map(name => ({
      name,
      price: dataValues[name].price
    }));


    // const data = Object.entries(dataValues).map((x: any[]) =>
    //   x.map(([key, value]: [any, any]) => ({ name: key, pay: value.price }))
    // );
    this.dataSource = data;
    console.log(data);
  }

  constructor() {}

  ngOnInit(): void {}
}
