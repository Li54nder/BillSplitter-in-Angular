import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit, inject } from '@angular/core';
import { take } from 'rxjs';
import { Item } from 'src/app/models/item';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'pay', 'iban'];
  dataSource: any[] = [];
  itemsTMP: Item[] = [];

  @Input()
  set items(items: Item[]) {
    this.itemsTMP = items;
    let dataValues: any = {};
    items.forEach((item) => {
      item.people.forEach((person) => {
        if (!dataValues[person]) {
          dataValues[person] = {
            price: 0,
            iban: undefined
          };
        }
        dataValues[person] = {
          price: dataValues[person]['price'] + item.price / item.people.length,
        };
      });
    });

    this.dataSource = Object.keys(dataValues).map(name => ({
      name,
      price: dataValues[name].price
    }));
  }

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  createUser(person: string) {
    this.userService.createUser(person).pipe(take(1)).subscribe({
      next: (res: any) => {
        for (let user of this.dataSource) {
          if (user.name == person) {
            user.iban = res.iban;
          }
        }
      }
    })
  }
}
