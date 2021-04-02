import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';

import { GetPostsService } from './services/get-posts.service';
import { FormateNumberPipe } from './pipes/formate-number.pipe';
import { ProgressComponent } from './components/progress/progress.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, SearchComponent, FormateNumberPipe, ProgressComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
