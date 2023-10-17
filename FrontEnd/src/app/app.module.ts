import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainLayoutComponent } from './Component/Home/main-layout/main-layout.component';
import { HeaderComponent } from './Component/Home/header/header.component';
import { FooterComponent } from './Component/Home/footer/footer.component';
import { ErrorPageComponent } from './Component/Home/error-page/error-page.component';
import { IndexPageComponent } from './Component/Home/index-page/index-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    IndexPageComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
