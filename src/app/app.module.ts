import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuickviewComponent } from './quickview/quickview.component';
import { DetailviewComponent } from './detailview/detailview.component';

import { DishService } from './services/dish.service';
import { ErrorProcessorService } from './services/error-processor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuickviewComponent,
    DetailviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    DishService,
    ErrorProcessorService
  ],
  entryComponents: [
    QuickviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
