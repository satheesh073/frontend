import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NmrComponent } from './nmr/nmr.component';
import { TcrComponent } from './tcr/tcr.component';

const routes: Routes = [
  { path: 'nmr', component: NmrComponent },
  { path: 'tcr', component: TcrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
