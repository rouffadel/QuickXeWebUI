import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import * as pako from 'pako';
import { environment } from 'environments/environments';

@Injectable({ providedIn: 'root' })


export class AuthService {
    baseUrl
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
    private router: Router
   
    
constructor(){
    this.baseUrl=environment.apiUrl
}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    // set accessToken(token: string) {
    //     localStorage.setItem('accessToken', token);
    // }

    // get accessToken(): string {
    //     return localStorage.getItem('accessToken') ?? '';
    // }

    set accessToken(token: string) {
        sessionStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return sessionStorage.getItem('accessToken') ?? '';
    }


    // //Setter & getter for loggged in user role
    // set loggedInUserRole(roleName: string) {
    //     localStorage.setItem('loggedInUserRole', roleName);
    // }

    // get loggedInUserRole(): string {
    //     return localStorage.getItem('loggedInUserRole') ?? '';
    // }

    // //Setter & getter for loggged in user id
    // set loggedInUserId(userId: string) {
    //     localStorage.setItem('loggedInUserId', userId);
    // }

    // get loggedInUserId(): string {
    //     return localStorage.getItem('loggedInUserId') ?? '';
    // }    


    //Setter & getter for loggged in user role
    set loggedInUserRole(roleName: string) {
        sessionStorage.setItem('loggedInUserRole', roleName);
    }

    get loggedInUserRole(): string {
        return sessionStorage.getItem('loggedInUserRole') ?? '';
    }

    //Setter & getter for loggged in user id
    set loggedInUserId(userId: string) {
        sessionStorage.setItem('loggedInUserId', userId);
    }

    get loggedInUserId(): string {
        return sessionStorage.getItem('loggedInUserId') ?? '';
    }   
    
       //Setter & getter for loggged in user id
        set userName(username: string) {
            sessionStorage.setItem('userName', username);
        }
    
        get userName(): string {
            return sessionStorage.getItem('userName') ?? '';
        }  



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
    //  * @param email
    //  */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    // /**
    //  * Reset password
    //  *
    //  * @param password
    //  */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    // signIn(credentials: { emailAddressOrPhoneNumber: string; password: string }): Observable<any> {
    //     debugger
    //     // Throw error, if the user is already logged in
    //     if (this._authenticated) {
    //         return throwError('User is already logged in.');
    //     }

    //     return this._httpClient.post('https://localhost:7034/api/Accounts/signIn', credentials).pipe(
    //         switchMap((response: any) => {
    //             debugger
               
    //             this.accessToken = response.accessToken;
    //             this._authenticated = true;
    //             this._userService.user = response.user;
    //             return of(response);
    //         }),
    //         catchError((error) => {
    //             console.error('Sign-in error:', error);
    //             return throwError(error);
    //         })
    //     );
    // }

    // isValidJwt(token: string): boolean {
    //     try {
    //       const payload = JSON.parse(atob(token.split('.')[1]));
    //       return !!payload; // Returns true if payload exists
    //     } catch (error) {
    //       console.error('Invalid JWT:', error);
    //       return false;
    //     }
    //   }

      
    // accesToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzkyNTU0MTEsImlzcyI6IkZ1c2UiLCJleHAiOjE3Mzk4NjAyMTF9.G5GGKkqYLGwC4G4ElXNJfcCnVZC_Fmuj1G4cXPRPx-c"
      
    // useer={
    // "id": "cfaad35d-07a3-4447-a6c3-d8c3d54fd5df",
    // "name": "Tenant",
    // "email": "tenant@gmail.com",
    // "avatar": "images/avatars/brian-hughes.jpg",
    // "status": "online"
    // }

    signIn(credentials: { email: string; password: string }): Observable<any> {
        debugger
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this.baseUrl+'Registration/login', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.data.token;
              //  this.accesToken=this.accesToken

                // // Store the logged in user role in the local storage
                // localStorage.setItem('loggedInUserRole', response.data.roles[0].roleName);

                // // Store the logged in user id in the local storage
                // localStorage.setItem('loggedInUserId', response.data.userId);


                // Store the logged in user role in the local storage
                sessionStorage.setItem('loggedInUserRole', response.data.roles[0].roleName);
                sessionStorage.setItem('userName', response.data.username);
                // Store the logged in user id in the local storage
                sessionStorage.setItem('loggedInUserId', response.data.userId);


                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                // this._userService.user = this.useer;
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient
            .post('api/auth/sign-in-with-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Replace the access token with the new one if it's available on
                    // the response object.
                    //
                    // This is an added optional step for better security. Once you sign
                    // in using the token, you should generate a new one on the server
                    // side and attach it to the response object. Then the following
                    // piece of code can replace the token with the refreshed one.
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        // localStorage.removeItem('accessToken');

        // sessionStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        // name: string;
        // email: string;
        // password: string;
        // company: string;
        firstName: string;
        email: string;
        password: string;
        companyName: string;
        roleId: string;
        roleName: string;
    }): Observable<any> {
        return this._httpClient.post(this.baseUrl+'Registration/register', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
