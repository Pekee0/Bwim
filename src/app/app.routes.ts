import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ScrollRevealComponent } from './scroll-reveal/scroll-reveal.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { AboutPageComponent } from './about/pages/about-page/about-page.component';

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
        component: AboutPageComponent
    },
    {   
        path: '**',
        component: ScrollRevealComponent
    }    
];
