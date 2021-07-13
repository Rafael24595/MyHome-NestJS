import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth-components/sign-in/sign-in.component';
import { CollectionsComponent } from './components/body/collections/collections.component';
import { FileManagerComponent } from './components/body/file-manager/file-manager.component';
import { HomeComponent } from './components/body/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: SignInComponent},
  { path: 'Manage', component: FileManagerComponent},
  { path: 'Collection', component: CollectionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
