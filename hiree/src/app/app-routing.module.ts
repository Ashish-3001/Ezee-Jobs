import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'employer-profile/employer-home',
    children: [
      {
        path: '',
        loadChildren: () => import('./employer-home/employer-home.module').then( m => m.EmployerHomePageModule)
      },
      {
        path: ':eyer_id',
        loadChildren: () => import('./employer-home/details/details.module').then( m => m.DetailsPageModule)
      },
      {
        path: 'menu/profile',
        loadChildren: () => import('./employer-home/menu/employer-profile/employee-profile.module').then( m => m.EmployerProfilePageModule)
      },
      {
        path: 'menu/favourites',
        loadChildren: () => import('./employer-home/menu/favourites/favourites.module').then( m => m.FavouritesPageModule)
      },
      {
        path: 'menu/apllication-status',
        loadChildren: () => import('./employer-home/menu/applications-recived/application-status.module').then( m => m.ApplicationsRecPageModule)
      },
      {
        path: 'menu/apllication-status/:eyer_id',
        loadChildren: () => import('./employer-home/menu/applications-recived/job_status_details/details.module').then( m => m.DetailsPageModule)
      },
      {
        path: 'menu/apllication-status/:eyer_id/jobs-offered',
        loadChildren: () => import('./employer-home/menu/applications-recived/jobs-offered/jobs-offered.module').then( m => m.JobsOfferedPageModule)
      },
      {
        path: 'menu/apllication-status/:eyer_id/eyee-applied',
        loadChildren: () => import('./employer-home/menu/applications-recived/eyee-applied/eyee-applied.module').then( m => m.EyeeAppliedPageModule)
      },
      {
        path: 'menu/apllication-status/:eyer_id/eyee-shortlisted',
        loadChildren: () => import('./employer-home/menu/applications-recived/eyee-shortlisted/eyee-shortlisted.module').then( m => m.EyeeShortlistedPageModule)
      },
      {
        path: ':eyer_id/job-offer',
        loadChildren: () => import('./employer-home/job-offer/job-offer.module').then( m => m.JobOfferPageModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register-as-employer',
    loadChildren: () => import('./register-as-employer/register-as-employer.module').then( m => m.RegisterAsEmployerPageModule)
  },
  {
    path: 'register-as-employee',
    loadChildren: () => import('./register-as-employee/register-as-employee.module').then( m => m.RegisterAsEmployeePageModule)
  },
  {
    path: 'employee-home',
    children: [
      {
        path: '',
        loadChildren: () => import('./employee-home/employee-home.module').then( m => m.EmployeeHomePageModule)
      },
      {
        path: ':eyee_id',
        loadChildren: () => import('./employee-home/details/details.module').then( m => m.DetailsPageModule)
      },
      {
        path: 'menu/profile',
        loadChildren: () => import('./employee-home/menu/employee-profile/employee-profile.module').then( m => m.EmployeeProfilePageModule)
      },
      {
        path: 'menu/favourites',
        loadChildren: () => import('./employee-home/menu/favourites/favourites.module').then( m => m.FavouritesPageModule)
      },
      {
        path: 'menu/apllication-status',
        loadChildren: () => import('./employee-home/menu/application-status/application-status.module').then( m => m.ApplicationStatusPageModule)
      },
      {
        path: ':eyee_id/employee-apply',
        loadChildren: () => import('./employee-home/employee-apply/employee-apply.module').then( m => m.EmployeeApplyPageModule)
      }
    ]
  },
  {
    path: 'reg-employer-basic',
    loadChildren: () => import('./register-as-employer/reg-employer-basic/reg-employer-basic.module').then( m => m.RegEmployerBasicPageModule)
  },
  {
    path: 'reg-employee-basic',
    loadChildren: () => import('./register-as-employee/reg-employee-basic/reg-employee-basic.module').then( m => m.RegEmployeeBasicPageModule)
  },
  {
    path: 'employer-profile/requirements-page',
    loadChildren: () => import('./employer-home/requirements-page/requirements-page.module').then( m => m.RequirementsPagePageModule)
  },
  {
    path: 'employer-profile',
    loadChildren: () => import('./employer-home/employer-profile/employer-profile.module').then( m => m.EmployerProfilePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },


  

  

  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
