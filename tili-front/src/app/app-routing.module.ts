import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './components/documents/documents.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'documents', component: DocumentsComponent },
  { path: 'upload', component: UploadComponent },
  { path: '', redirectTo: '/documents', pathMatch: 'full' } // route par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
