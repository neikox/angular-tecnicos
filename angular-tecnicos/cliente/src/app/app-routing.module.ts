import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaComponent } from './componentes/ficha/ficha.component';
import { CuerpoComponent } from './componentes/cuerpo/cuerpo.component';
import { TecnicosComponent } from './componentes/tecnicos/tecnicos.component';
import { SigninComponent } from './componentes/signin/signin.component';
import { LimitadoComponent } from './componentes/limitado/limitado.component';
import { FichatecnicosComponent } from './componentes/fichatecnicos/fichatecnicos.component';
import { StatsComponent } from './componentes/stats/stats.component';


const routes: Routes = [
  {path: '', component:SigninComponent},
  {path: 'tecnicos', component:TecnicosComponent},
  {path: 'tecnicos/fichatecnicos/:id', component:FichatecnicosComponent},
  {path: 'tareas/:_id', component:CuerpoComponent},
  {path: 'tareasl/:_id', component:LimitadoComponent},
  {path: 'tareas/ficha/:id', component:FichaComponent},
  {path: 'stats', component:StatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }