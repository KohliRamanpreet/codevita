import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuickviewComponent } from '../quickview/quickview.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  search: string = null;
  mainDishes: Dish[] = null;
  dishes: Dish[] = null;
  errMsg: string = null;
  myBool: boolean;
   
  constructor(
    private dishService: DishService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(
      (data) => {
        this.mainDishes = data.dishes;
        this.assignCopy();
      },
      (err) => (this.errMsg = <any>err)
    );
  }

  assignCopy(): void {
    this.dishes = Object.assign([], this.mainDishes);
  }

  filterItem() {
    if (!this.search) {
      this.assignCopy();
    }
    this.dishes = Object.assign([], this.mainDishes).filter(
      (item) => item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
    );
    if (this.dishes && this.search != '') {
      this.myBool = true;
    } else {
      this.myBool = false;
    }
  }

  changeLiked(id: number) {
    this.mainDishes.forEach((dish) => {
      if (dish.id == id) {
        dish.liked = !dish.liked;
      }
    });
  }

  openDish(id: number): void {
    this.dishService.modalDishId = id;
    this.modalService.open(QuickviewComponent, {
      centered: true,
      keyboard: true,
    });
  }
}
