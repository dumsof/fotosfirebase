import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { CargaComponent } from './components/carga/carga.component';
import { FotosComponent } from './components/fotos/fotos.component';

const routes: Routes = [
    { path: 'carga', component: CargaComponent },
    { path: 'fotos', component: FotosComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'fotos' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }

