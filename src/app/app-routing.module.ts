import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { BlogPageComponent } from './pages/blog/blog.component';
import { BlogDetailPageComponent } from './pages/blog/blog-detail/blog-detail.component';
import { RegisterPage } from './pages/auth/register/register.component';
import { LoginPageComponent } from './pages/auth/login/login.component';
import { BlogIndexPage } from './pages/blog/blog-index/blog-index.component';
import { BlogFormPage } from './pages/blog/blog-form/blog-form.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'blogs',
    component: BlogPageComponent,
    children: [
      { path: '', component: BlogIndexPage },
      { path: 'new-post', component: BlogFormPage },
    ],
  },
  { path: 'blogs/:blogId', component: BlogDetailPageComponent },
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
