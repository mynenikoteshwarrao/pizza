import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrderComponent } from './components/order/order.component';
import { PizzaMaterialModule } from './modules/material-module';
import { InprogressComponent } from './components/inprogress/inprogress.component';
import { CompletedComponent } from './components/completed/completed.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { DispListComponent } from './components/bottom-sheet/disp-list/disp-list.component';
import { ReportCardComponent } from './components/report-card/report-card.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NavigationComponent, OrderComponent, InprogressComponent, CompletedComponent, ReportsComponent, BottomSheetComponent, DispListComponent, ReportCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    PizzaMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
