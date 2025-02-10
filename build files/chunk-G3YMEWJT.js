import{c as u}from"./chunk-FF7WTQSX.js";import{$ as l,J as m,ca as k,fa as c,la as a,o as d,s as n,t as f,x as g}from"./chunk-JXXSLBLR.js";var T=(()=>{let e=class e{constructor(){this._httpClient=a(u),this._user=new d(1)}set user(t){this._user.next(t)}get user$(){return this._user.asObservable()}get(){return this._httpClient.get("api/common/user").pipe(k(t=>{this._user.next(t)}))}update(t){return this._httpClient.patch("api/common/user",{user:t}).pipe(g(s=>{this._user.next(s)}))}};e.\u0275fac=function(s){return new(s||e)},e.\u0275prov=c({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var h=class{static isTokenExpired(e,r){if(!e||e==="")return!0;let t=this._getTokenExpirationDate(e);return r=r||0,t===null?!0:!(t.valueOf()>new Date().valueOf()+r*1e3)}static _b64decode(e){let r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",t="";if(e=String(e).replace(/=+$/,""),e.length%4===1)throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");for(let s=0,p,o,_=0;o=e.charAt(_++);~o&&(p=s%4?p*64+o:o,s++%4)?t+=String.fromCharCode(255&p>>(-2*s&6)):0)o=r.indexOf(o);return t}static _b64DecodeUnicode(e){return decodeURIComponent(Array.prototype.map.call(this._b64decode(e),r=>"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)).join(""))}static _urlBase64Decode(e){let r=e.replace(/-/g,"+").replace(/_/g,"/");switch(r.length%4){case 0:break;case 2:{r+="==";break}case 3:{r+="=";break}default:throw Error("Illegal base64url string!")}return this._b64DecodeUnicode(r)}static _decodeToken(e){if(!e)return null;let r=e.split(".");if(r.length!==3)throw new Error("The inspected token doesn't appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.");let t=this._urlBase64Decode(r[1]);if(!t)throw new Error("Cannot decode the token.");return JSON.parse(t)}static _getTokenExpirationDate(e){let r=this._decodeToken(e);if(!r.hasOwnProperty("exp"))return null;let t=new Date(0);return t.setUTCSeconds(r.exp),t}};var P=(()=>{let e=class e{constructor(){this._authenticated=!1,this._httpClient=a(u),this._userService=a(T)}set accessToken(t){localStorage.setItem("accessToken",t)}get accessToken(){return localStorage.getItem("accessToken")??""}forgotPassword(t){return this._httpClient.post("api/auth/forgot-password",t)}resetPassword(t){return this._httpClient.post("api/auth/reset-password",t)}signIn(t){return this._authenticated?f("User is already logged in."):this._httpClient.post("api/auth/sign-in",t).pipe(l(s=>(this.accessToken=s.accessToken,this._authenticated=!0,this._userService.user=s.user,n(s))))}signInUsingToken(){return this._httpClient.post("api/auth/sign-in-with-token",{accessToken:this.accessToken}).pipe(m(()=>n(!1)),l(t=>(t.accessToken&&(this.accessToken=t.accessToken),this._authenticated=!0,this._userService.user=t.user,n(!0))))}signOut(){return localStorage.removeItem("accessToken"),this._authenticated=!1,n(!0)}signUp(t){return this._httpClient.post("api/auth/sign-up",t)}unlockSession(t){return this._httpClient.post("api/auth/unlock-session",t)}check(){return this._authenticated?n(!0):this.accessToken?h.isTokenExpired(this.accessToken)?n(!1):this.signInUsingToken():n(!1)}};e.\u0275fac=function(s){return new(s||e)},e.\u0275prov=c({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();export{h as a,T as b,P as c};
