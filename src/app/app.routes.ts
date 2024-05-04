import { Routes } from '@angular/router';
import {CampaignComponent} from "./pages/dashboard/campaign/campaign.component";

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
    path: 'campaign/:id',
      loadComponent: () => import('./pages/dashboard/campaign/campaign.component').then(m => m.CampaignComponent),
      // resolve:
      //   {
      //     campaign: 'campaignResolver'
      //   }

  },
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    //resolve: {campaigns: 'dashboardResolver'}
  }
];
