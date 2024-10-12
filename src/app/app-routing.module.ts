import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './ui/components/about/about.component';
import { HomeComponent } from './ui/components/home/home.component';
import { ContactComponent } from './ui/components/contact/contact.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { ArticleComponent } from './ui/components/article/article.component';
import { ArchiveComponent } from './ui/components/archive/archive.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { CategoriesComponent } from './admin/admin-components/categories/categories.component';
import { LoginComponent } from './ui/components/login/login.component';
import { authGuard } from './guards/auth-guard';


const routes: Routes = [
  {
    path:"",
    component:LayoutComponent,
    children:[
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"article/:category/:title/:id",
        component:ArticleComponent
      },
      {
        path:"categories/:category/:id",
        component:HomeComponent
      },
      {
        path:"page/:page",
        component:HomeComponent
      },
      {
        path:"articles/:search",
        component:HomeComponent
      },
      {
        path:"archive/:year/:month",
        component:ArchiveComponent
      },
      {
        path:"archive/:year/:month/page/:page",
        component:ArchiveComponent
      },
      {
        path:"about",
        component:AboutComponent
      },
      {
        path:"contact",
        component:ContactComponent
      },
      {
        path:"login",
        component:LoginComponent
      }
    ]
  },
  {
    path:"admin",
    component:AdminLayoutComponent,
    canActivate:[authGuard],
    children:[
      {
        path:"articles",
        loadChildren:()=>import("../app/admin/admin-components/articles/articles.module").then(module=>module.ArticlesModule)
      },
      {
        path:"categories",
        component:CategoriesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
