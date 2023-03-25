import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopsComponent } from './shops/shops.component';

const routes: Routes = [
  { path: '',redirectTo:'home',pathMatch:'full'},
  { path: 'home', component: HomeComponent },
{ path: 'shop', component: ShopsComponent },
{ path: 'contact', component: ContactComponent },
{ path: 'about', component: AboutComponent },
{ path: 'cart', component: CartComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'analytics', component: AnalyticsComponent },
{ path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
