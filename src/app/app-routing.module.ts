import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './components/to-do/to-do.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/todo',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    component: ToDoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
