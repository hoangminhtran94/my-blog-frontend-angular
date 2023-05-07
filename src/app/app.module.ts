import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home.component';
import { NavBarComponent } from './UI/navbar/navbar.component';
import { BlogPageComponent } from './pages/blog/blog.component';
import { BlogItemComponent } from './pages/blog/components/blog-item/blog-item.component';
import { ThoughItemComponent } from './pages/home/components/though-item.component';
import { BlogDetailPageComponent } from './pages/blog/blog-detail/blog-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterPage } from './pages/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    BlogPageComponent,
    BlogItemComponent,
    ThoughItemComponent,
    BlogDetailPageComponent,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
