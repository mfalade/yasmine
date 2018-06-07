import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NglModule } from 'ng-lightning/ng-lightning';
import { RouterModule, Routes } from '@angular/router';

import { RequestService } from './_services/request.service';
import { AppComponent } from './app.component';
import { DataListComponent } from './_components/data-list/data-list.component';
import { EditItemComponent } from './_components/edit-item/edit-item.component';
import { AddDataComponent } from './_components/add-data/add-data.component';
import { HomeComponent } from './_components/home/home.component';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'data/create', component: AddDataComponent },
  { path: 'data/:id/edit', component: EditItemComponent },
  { path: 'users', component: DataListComponent },
  { path: '*', redirectTo: '/' },
];

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    EditItemComponent,
    AddDataComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NglModule.forRoot()
  ],
  providers: [HttpModule, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
