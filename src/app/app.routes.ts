import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'shop',
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop.component').then(m => m.ShopComponent)
  },
  {
    path: 'aboutus',
    loadComponent: () => import('./pages/aboutus/aboutus.component').then(m => m.AboutusComponent)
  },
  {
    path: 'item',
    loadComponent: () => import('./pages/item/item.component').then(m => m.ItemComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  }
];
