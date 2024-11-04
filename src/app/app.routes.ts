import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ScrollRevealComponent } from './scroll-reveal/scroll-reveal.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { UniversePagesComponent } from './universe/universe-pages/universe-pages.component';

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
        path: 'universe',
        component: UniversePagesComponent
    },
    {
        path: '**',
        component: ScrollRevealComponent
    }
];
