import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ProjectPageComponent } from './project-page/project-page.component';
import { AboutComponent } from './pages/about/about.component';
import { UniversePagesComponent } from './universe/universe-pages/universe-pages.component';
import { HomePageComponent } from './pages/homePage/home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
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
        path: 'universe',
        component: UniversePagesComponent
    },
    {
        path: '**',
        component: HomePageComponent
    }
];
