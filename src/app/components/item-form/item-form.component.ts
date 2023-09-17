import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Item } from 'src/app/models/item';
import { People } from 'src/app/models/people';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  @Input() people: People[] = [];
  @Input() item!: Item;
  @Output() updatedItem = new EventEmitter<Item>();
  form!: FormGroup;
  isKilled = new Subject<any>();

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      price: [this.item.price, Validators.required],
      people: [this.item.people, Validators.required]
    })

    this.form.valueChanges.pipe(
      takeUntil(this.isKilled)
    ).subscribe(_ => {
      this.updateItem()
    })
  }

  ngOnDestroy() {
    this.isKilled.next(null);
    this.isKilled.complete();
  }

  updateItem() {
    this.updatedItem.emit({
      id: this.item.id,
      ...this.form.value
    })
  }
}
