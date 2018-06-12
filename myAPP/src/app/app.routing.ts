
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { DashboardComponent } from './dashboard/index';
import { PageNotFoundComponent } from './pageNotFound/index';
import { RawMaterialComponent } from './rawMaterial/index';

export const appRoutes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'rawMaterial', component: RawMaterialComponent },
            { path: '**', redirectTo: '404', pathMatch: 'full' },
            { path: '404', component: PageNotFoundComponent }
        ]
    },
    /*  otherwise redirect to home  */
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
export const routing = RouterModule.forRoot(appRoutes);
