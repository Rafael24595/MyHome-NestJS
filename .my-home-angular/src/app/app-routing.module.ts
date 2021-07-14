import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth-components/sign-in/sign-in.component';
import { CollectionsComponent } from './components/body/collections/collections.component';
import { FileManagerComponent } from './components/body/file-manager/file-manager.component';
import { HomeComponent } from './components/body/home/home.component';
import { MediaViewComponent } from './components/body/media-view/media-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: SignInComponent},
  { path: 'Manage', component: FileManagerComponent, 
      children: [{
        path: '**',
        component: MediaViewComponent
      }]
  },
  { path: 'Collection', component: CollectionsComponent},
  { path: 'Media', component: MediaViewComponent, 
      children: [{
        path: '**',
        component: MediaViewComponent
      }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
