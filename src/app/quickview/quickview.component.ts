import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.css'],
})
export class QuickviewComponent implements OnInit {
  dish: Dish = null;
  errMsg: string = null;
  stars = [];

  constructor(private dishService: DishService, public modalService: NgbActiveModal) {}

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(
      (data) => {
        this.dish = this.dishService.dishess.filter(
          (dish) => dish.id == this.dishService.modalDishId
        )[0];
        for (var i = 0; i < this.dish.id % 5; i++) {
          this.stars.push(i);
        }
      },
      (err) => (this.errMsg = <any>err)
    );
  }
}
