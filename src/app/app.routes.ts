import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ScrollRevealComponent } from './scroll-reveal/scroll-reveal.component';
import { ProjectPageComponent } from './project-page/project-page.component';

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
    path: '**',
    component: ScrollRevealComponent
}    
];
