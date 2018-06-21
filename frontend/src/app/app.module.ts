import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NglModule } from 'ng-lightning/ng-lightning';
import { RouterModule, Routes } from '@angular/router';

import { RequestService } from './_services/request.service';
import { StoreService } from './_services/store.service';
import { NavService } from './_services/nav.service';
import { AppComponent } from './app.component';
import { DataListComponent } from './_components/data-list/data-list.component';
import { EditUserComponent } from './_components/edit-user/edit-user.component';
import { AddUserComponent } from './_components/add-user/add-user.component';
import { AddRequestComponent } from './_components/add-request/add-request.component';
import { EditRequestComponent } from './_components/edit-request/edit-request.component';
import { RequestsComponent } from './_components/requests/requests.component';
import { LinkItemComponent } from './_components/link-item/link-item.component';


export const appRoutes: Routes = [
  { path: 'requests/add', component: AddRequestComponent },
  { path: 'requests/:id/edit', component: EditRequestComponent },
  { path: 'user/create', component: AddUserComponent },
  { path: 'user/:id/edit', component: EditUserComponent },
  { path: 'users', component: DataListComponent },
  { path: 'requests', component: RequestsComponent },
  { path: '', redirectTo: '/requests', pathMatch: 'full' },
  { path: '*', redirectTo: '/requests', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    EditUserComponent,
    AddUserComponent,
    AddRequestComponent,
    EditRequestComponent,
    RequestsComponent,
    LinkItemComponent
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
  providers: [HttpModule, RequestService, StoreService, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
