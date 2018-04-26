
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserViewComponent } from "./components/user-view/user-view.component";
import { UserNewComponent } from "./components/user-new/user-new.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";

export const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'usuarios', component: UserListComponent },
    // { path: 'usuarios/new', component: UserNewComponent },
    // { path: 'usuarios/view/:id', component: UserViewComponent },
    // { path: 'usuarios/edit/:id', component: UserEditComponent },
    { path: '**', component: PageNotFoundComponent }
]
    ;
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);