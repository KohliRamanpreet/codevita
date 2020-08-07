import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Dish } from '../shared/dish';
import { map, catchError } from 'rxjs/operators';
import { ErrorProcessorService } from './error-processor.service';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  modalDishId: number = null;
  dishess: Dish[] = null;

  constructor(
    private http: HttpClient,
    private errorProcessorService: ErrorProcessorService
  ) {}

  getDishes(): Observable<any> {
    return this.http
      .get<Dish[]>('http://starlord.hackerearth.com/recipe')
      .pipe(
        map((res) => {
          if (res) {
            this.dishess = res;
            return { dishes: res };
          } else {
            return { dishes: null };
          }
        })
      )
      .pipe(catchError(this.errorProcessorService.handleError));
  }

  setId(id: number) {
    this.modalDishId = id;
  }
}
