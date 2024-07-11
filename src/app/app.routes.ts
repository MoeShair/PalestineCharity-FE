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
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./pages/user/user.component').then(m => m.UserComponent),
  },
  {
    path: 'sub-campaigns/:id',
    loadComponent: () => import('./pages/sub-campaign/sub-campaign.component').then(m => m.SubCampaignComponent),
  },
  {
    path: 'my-campaigns',
    loadComponent: () => import('./pages/my-campaigns/my-campaigns.component').then(m => m.MyCampaignsComponent),
  },
  {
    path: 'my-SubCampaigns',
    loadComponent: () => import('./pages/my-sub-campaigns/my-sub-campaigns.component').then(m => m.MySubCampaignsComponent),
  },
  {
    path: 'favourites',
    loadComponent: () => import('./pages/favourite/favourite.component').then(m => m.FavouriteComponent)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent)
  },
  {
    path: 'donation-records',
    loadComponent: () => import('./pages/donation-records/donation-records.component').then(m => m.DonationRecordsComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  }
];
