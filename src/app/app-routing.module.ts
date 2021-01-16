import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  // { path: 'property', loadChildren: () => import('./modules/property/property.module').then(m => m.PropertyModule) },

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: PostListComponent },
  { path: 'posts/:postId', component: SinglePostComponent },
  { path: 'edit/:postId', component: PostCreateComponent },
  { path: 'create-post', component: PostCreateComponent },
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'contact', component: ContactComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
