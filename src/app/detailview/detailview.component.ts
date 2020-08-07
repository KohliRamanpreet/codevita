import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css'],
})
export class DetailviewComponent implements OnInit {
  id: number = null;
  dish: Dish = null;
  stars = [];
  rou: Params = null;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.rou = this.route.params;
    if (this.dishService.dishess) {
      this.dish = this.dishService.dishess.filter(
        (dish) => dish.id == this.rou.value.id
      )[0];
      for (var i = 0; i < this.dish.id % 5; i++) {
        this.stars.push(i);
      }
    } else {
      this.dishService.getDishes().subscribe((data) => {
        this.dishService.dishess = data.dishes;
        this.dish = this.dishService.dishess.filter(
          (dish) => dish.id == this.rou.value.id
        )[0];
        for (var i = 0; i < this.dish.id % 5; i++) {
          this.stars.push(i);
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  changeLiked(id: number) {
    this.dish.liked = !this.dish.liked;
  }
}
