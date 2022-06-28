import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './pages/test/test.component';
import { LoginComponent } from './pages/login/login.component';
import { OperationsComponent } from './components/operations/operations.component';
import { OperationEditComponent } from './components/operation-edit/operation-edit.component';
import { AllOperationsComponent } from './pages/all-operations/all-operations.component';
import { OperationAddComponent } from './components/operation-add/operation-add.component';
import { StatsCellComponent } from './components/stats-cell/stats-cell.component';
import { StatsComponent } from './pages/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TestComponent,
    LoginComponent,
    OperationsComponent,
    OperationEditComponent,
    AllOperationsComponent,
    OperationAddComponent,
    StatsCellComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
