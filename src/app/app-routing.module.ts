//generic libs
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//component
import { BitcoinComponent } from './bitcoin/bitcoin.component';

const routes: Routes = [
  {
    path: '',
    component: BitcoinComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
