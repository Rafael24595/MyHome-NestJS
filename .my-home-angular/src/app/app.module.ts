import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/auth-components/sign-in/sign-in.component';
import { AuthInterceptorService } from './services/auth/auth-interceptor/auth.interceptor.service';
import { AuthTools } from 'src/utils/tools/auth.tools';
import { HomeComponent } from './components/body/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FileManagerComponent } from './components/body/file-manager/file-manager.component';
import { CollectionsComponent } from './components/body/collections/collections.component';
import { MediaViewComponent } from './components/body/media-view/media-view.component';
import { MiscTools } from 'src/utils/tools/misc.tools';
import { ModalBaseComponent } from './components/modal-components/modal-base.component';
import { ModalSimpleComponent } from './components/modal-components/modal-simple/modal-simple/modal-simple.component';
import { BottomAuxMenuComponent } from './components/body/file-manager/bottom-aux-menu/bottom-aux-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FileManagerComponent,
    CollectionsComponent,
    MediaViewComponent,
    ModalBaseComponent,
    ModalSimpleComponent,
    BottomAuxMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthTools,
    MiscTools,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
