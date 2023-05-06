import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { BlogPageComponent } from './pages/blog/blog.component';
import { BlogDetailPageComponent } from './pages/blog/blog-detail/blog-detail.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'blogs', component: BlogPageComponent },
  { path: 'blogs/:blogId', component: BlogDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
