import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ScrollRevealComponent } from './scroll-reveal/scroll-reveal.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {
        path: '',
        component: ScrollRevealComponent
    },
    {
        path: 'projects',
        component: ProjectPageComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {   
        path: '**',
        component: ScrollRevealComponent
    }    
];
