import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListStocksComponent } from './components/list-stocks/list-stocks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

import { environment } from 'src/environments/environment';

import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

import { AuthGuardService } from './services/auth-guard.service';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ChartModule } from 'angular-highcharts';
import { ColorGeneratorPipe } from './pipes/color-generator.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { NewsComponent } from './components/news/news.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListStocksComponent,
    MainPageComponent,
    ColorGeneratorPipe,
    ProfileComponent,
    NewsComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase,'front-end'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    FormsModule,
    ChartModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [AuthService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
