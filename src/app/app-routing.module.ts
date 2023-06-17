import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmplopeeInfoComponent } from './components/emplopee-info/emplopee-info.component';

const routes: Routes = [{ path: '', component: EmplopeeInfoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
