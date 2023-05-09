import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { BlogPage } from './pages/blog/blog.component';
import { BlogDetailPage } from './pages/blog/blog-detail/blog-detail.component';
import { RegisterPage } from './pages/auth/register/register.component';
import { LoginPage } from './pages/auth/login/login.component';
import { BlogIndexPage } from './pages/blog/blog-index/blog-index.component';
import { BlogFormPage } from './pages/blog/blog-form/blog-form.component';
import { ProfilePage } from './pages/profile/profile.component';
import { AuthGuard } from './utils/guard/guard.service';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  {
    path: 'blogs',
    component: BlogPage,
    children: [
      { path: '', component: BlogIndexPage },
      { path: 'new-post', component: BlogFormPage, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'blogs/:blogId/edit',
    component: BlogFormPage,
    canActivate: [AuthGuard],
  },
  { path: 'blogs/:blogId', component: BlogDetailPage },
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage },
  { path: 'profile', component: ProfilePage, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
