import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { CategoryFormComponent } from './catalog-page/category-form/category-form.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderCatalogComponent } from './orders-page/order-catalog/order-catalog.component';
import { OrderPositionsComponent } from './orders-page/order-positions/order-positions.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth-guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'overview', component: OverviewPageComponent},
      {path: 'analytics', component: AnalyticsPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'orders', component: OrdersPageComponent, children: [
        {path: '', component: OrderCatalogComponent},
        {path: ':id', component: OrderPositionsComponent}  
      ]},
      {path: 'catalog', component: CatalogPageComponent},
      {path: 'catalog/new', component: CategoryFormComponent},
      {path: 'catalog/:id', component: CategoryFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
