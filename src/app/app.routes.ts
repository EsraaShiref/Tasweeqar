import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        data: { animation: 'HomePage' },
        loadComponent: () => import('./features/home/home').then(m => m.Home)
    },
    {
        path: 'about',
        data: { animation: 'AboutPage' },
        loadComponent: () => import('./features/about/about').then(m => m.About)
    },
    {
        path: 'services',
        data: { animation: 'ServicesPage' },
        loadComponent: () => import('./features/services/services').then(m => m.Services)
    },
    {
        path: 'projects',
        data: { animation: 'ProjectsPage' },
        loadComponent: () => import('./features/projects/projects').then(m => m.Projects)
    },
    {
        path: 'projects/:id',
        data: { animation: 'ProjectDetailPage' },
        loadComponent: () => import('./features/projects/project-detail/project-detail').then(m => m.ProjectDetail)
    },
    {
        path: 'contact',
        data: { animation: 'ContactPage' },
        loadComponent: () => import('./features/contact/contact').then(m => m.Contact)
    },
    {
        path: '**',
        redirectTo: ''
    }
];