import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projets', component: ProjectsComponent },
  { path: 'reunions', component: MeetingsComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: '**', redirectTo: '' }
];
