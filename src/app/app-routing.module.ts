import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { BlogPage } from './pages/blog/blog.component';
import { BlogDetailPage } from './pages/blog/blog-detail/blog-detail.component';
import { RegisterPage } from './pages/auth/register/register.component';
import { LoginPage } from './pages/auth/login/login.component';
import { BlogIndexPage } from './pages/blog/blog-index/blog-index.component';
import { BlogFormPage } from './pages/blog/blog-form/blog-form.component';
import { ProfilePage } from './pages/profile/profile.component';
import { AuthGuard } from './utils/guard/guard.service';
import { BlogServices } from './pages/blog/service/blog.service';
const routes: Routes = [
  { path: '', component: HomePage },
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
    resolve: {
      data: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = route.params['blogId'];
        return inject(BlogServices).getABlog(id);
      },
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'blogs/:blogId',
    component: BlogDetailPage,
    resolve: {
      data: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = route.params['blogId'];
        return inject(BlogServices).getABlog(id);
      },
    },
  },
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage },
  { path: 'profile', component: ProfilePage, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
