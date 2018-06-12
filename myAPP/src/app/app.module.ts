import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/index';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './pageNotFound/index';
import { DashboardComponent } from './dashboard/index';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RawMaterialComponent } from './rawMaterial/index';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,HomeComponent,DashboardComponent,HeaderComponent,PageNotFoundComponent,SidebarComponent,RawMaterialComponent
  ],
  imports: [
    BrowserModule, routing,HttpModule,FormsModule,ReactiveFormsModule,NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
