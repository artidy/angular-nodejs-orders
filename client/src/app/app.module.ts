import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { TokenInterseptor } from './shared/classes/token-interseptor';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { OrderCatalogComponent } from './orders-page/order-catalog/order-catalog.component';
import { OrderPositionsComponent } from './orders-page/order-positions/order-positions.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoryFormComponent } from './catalog-page/category-form/category-form.component';
import { PositionsFormComponent } from './catalog-page/category-form/positions-form/positions-form.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrdersPageComponent,
    OrderCatalogComponent,
    OrderPositionsComponent,
    CatalogPageComponent,
    LoaderComponent,
    CategoryFormComponent,
    PositionsFormComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterseptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
