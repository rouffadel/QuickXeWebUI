import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { AddtenantComponent } from './modules/admin/example/tenant/addtenant/addtenant.component';
import { VerifyOtpComponent } from '../../src/app/modules/auth/customer-preview/register/verify-otp/verify-otp.component'
import { VerifyLoginOtpComponent } from './modules/auth/customer-preview/login/verify-login-otp/verify-login-otp.component';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'index'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'main'},

    {path: 'signed-in-redirectTenant', pathMatch : 'full', redirectTo: 'currency'},
    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password/:EmailCode', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'welcome', loadChildren: () => import('app/modules/auth/welcome/welcome.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')},
            {path: 'index', loadChildren: () => import('app/modules/auth/customer-preview/customer-preview.routes')},
            {path: 'dashboard', loadChildren: () => import('app/modules/auth/customer-dashboard/customer-dashboard.routes')},
            {path: 'customer-order-booking', loadChildren: () => import('app/modules/auth/customer-preview/customer-order-booking/customer-order-booking.routes')},
            {path: 'carouseltest', loadChildren: () => import('app/modules/auth/carouseltest/carouseltest.routes')},
            {path: 'login', loadChildren: () => import('app/modules/auth/customer-preview/login/login.routes')},
            {path: 'register', loadChildren: () => import('app/modules/auth/customer-preview/register/register.routes')},
            {path: 'mydocuments', loadChildren: () => import('app/modules/auth/customer-dashboard/customerdocuments/customerdocuments.routes')},

            // { path: 'verify-otp', component: VerifyOtpComponent }, // Optional code
            // {path: 'verify-otp/:code', component: VerifyOtpComponent },
    //         {path: 'verify-otp', 
    // loadComponent: () => import('../app/modules/auth/customer-preview/register/verify-otp/verify-otp.component').then(m => m.VerifyOtpComponent) },
    { path: 'verify-otp', component: VerifyOtpComponent },
    {path: 'verify-login-otp', component: VerifyLoginOtpComponent},
            {path: 'success-set-password', loadChildren: () => import('app/modules/auth/success-set-password/success-set-password.routes')},
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')},
            {path: 'success-password', loadChildren: () => import('app/modules/auth/success-password/success-password.routes')},
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'main', loadChildren: () => import('app/modules/admin/example/example.routes')},
            {path: 'agent', loadChildren: () => import('app/modules/admin/example/tenant/tenant.routes')},
            {path: 'currency', loadChildren: () => import('app/modules/admin/example/currency/currency.routes')},
            {path: 'addcurrency', loadChildren: () => import('app/modules/admin/example/addcurrency/addcurrency.routes')},
            {path: 'updatecurrency', loadChildren: () => import('app/modules/admin/example/updatecurrency/updatecurrency.routes')},
            {path:'updateprofile', loadChildren: () => import('app/modules/admin/example/updateprofile/updateprofile.routes')},
            {path: 'changepassword', loadChildren: () => import('app/modules/admin/example/changepassword/changepassword.routes')},
            {path: 'myorders', loadChildren: () => import('app/modules/admin/example/myorders/myorders.routes')},
            {path: 'assignorders', loadChildren: () => import('app/modules/admin/example/assignorders/assignorders.routes')},
            {path: 'addtenant', loadChildren: () => import('app/modules/admin/example/tenant/addtenant/addtenant.routes')},
        ]
    }
];
