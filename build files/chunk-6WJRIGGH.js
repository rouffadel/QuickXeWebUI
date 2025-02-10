import{a as Z,b as $,c as ee}from"./chunk-V3FRD5BA.js";import{A as K,B as X,a as I,b as V,g as T,h as B,k as D,m as h,n as Q,o as z,q as U,s as O,t as Y,v as H,w as J,x as W}from"./chunk-B5M4UGYO.js";import{a as L,d as R}from"./chunk-QUQIA45S.js";import"./chunk-3FNJQZF6.js";import{n as q}from"./chunk-3GAKXOBE.js";import{c as G}from"./chunk-G3YMEWJT.js";import{m as N}from"./chunk-FF7WTQSX.js";import{$b as j,Aa as b,Ab as u,Db as t,Eb as e,Fb as l,Jb as S,Lb as P,Mb as _,R as w,Rb as E,Sb as C,Tb as M,Vb as i,Xb as A,_b as k,ab as n,bb as g,oa as v,sb as c,ub as m,xa as x,ya as y,za as F}from"./chunk-JXXSLBLR.js";var re=["forgotPasswordNgForm"],ie=()=>["/sign-in"];function oe(r,o){if(r&1&&(t(0,"fuse-alert",8),i(1),e()),r&2){let p=_();m("appearance","outline")("showIcon",!1)("type",p.alert.type)("@shake",p.alert.type==="error"),n(),A(" ",p.alert.message," ")}}function ne(r,o){r&1&&(t(0,"mat-error"),i(1," Email address is required "),e())}function ae(r,o){r&1&&(t(0,"mat-error"),i(1," Please enter a valid email address "),e())}function se(r,o){r&1&&(t(0,"span"),i(1," Send reset link "),e())}function le(r,o){r&1&&l(0,"mat-progress-spinner",13),r&2&&m("diameter",24)("mode","indeterminate")}var te=(()=>{let o=class o{constructor(d,s){this._authService=d,this._formBuilder=s,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this.forgotPasswordForm=this._formBuilder.group({email:["",[h.required,h.email]]})}sendResetLink(){this.forgotPasswordForm.invalid||(this.forgotPasswordForm.disable(),this.showAlert=!1,this._authService.forgotPassword(this.forgotPasswordForm.get("email").value).pipe(w(()=>{this.forgotPasswordForm.enable(),this.forgotPasswordNgForm.resetForm(),this.showAlert=!0})).subscribe(d=>{this.alert={type:"success",message:"Password reset sent! You'll receive an email if you are registered on our system."}},d=>{this.alert={type:"error",message:"Email does not found! Are you sure you are already a member?"}}))}};o.\u0275fac=function(s){return new(s||o)(g(G),g(H))},o.\u0275cmp=v({type:o,selectors:[["auth-forgot-password"]],viewQuery:function(s,a){if(s&1&&E(re,5),s&2){let f;C(f=M())&&(a.forgotPasswordNgForm=f.first)}},standalone:!0,features:[k],decls:52,vars:11,consts:[["forgotPasswordNgForm","ngForm"],[1,"flex","min-w-0","flex-auto","flex-col","items-center","sm:flex-row","sm:justify-center","md:items-start","md:justify-start"],[1,"w-full","px-4","py-8","sm:bg-card","sm:w-auto","sm:rounded-2xl","sm:p-12","sm:shadow","md:flex","md:h-full","md:w-1/2","md:items-center","md:justify-end","md:rounded-none","md:p-16","md:shadow-none"],[1,"mx-auto","w-full","max-w-80","sm:mx-0","sm:w-80"],[1,"w-12"],["src","images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","leading-tight","tracking-tight"],[1,"mt-0.5","font-medium"],[1,"mt-8",3,"appearance","showIcon","type"],[1,"mt-8",3,"formGroup"],[1,"w-full"],["id","email","matInput","",3,"formControlName"],["mat-flat-button","",1,"fuse-mat-button-large","mt-3","w-full",3,"click","color","disabled"],[3,"diameter","mode"],[1,"text-secondary","mt-8","text-md","font-medium"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],[1,"relative","hidden","h-full","w-1/2","flex-auto","items-center","justify-center","overflow-hidden","bg-gray-800","p-16","dark:border-l","md:flex","lg:px-28"],["viewBox","0 0 960 540","width","100%","height","100%","preserveAspectRatio","xMidYMax slice","xmlns","http://www.w3.org/2000/svg",1,"absolute","inset-0","pointer-events-none"],["fill","none","stroke","currentColor","stroke-width","100",1,"text-gray-700","opacity-25"],["r","234","cx","196","cy","23"],["r","234","cx","790","cy","491"],["viewBox","0 0 220 192","width","220","height","192","fill","none",1,"absolute","-top-16","-right-16","text-gray-700"],["id","837c3e70-6c3a-44e6-8854-cc48c737b659","x","0","y","0","width","20","height","20","patternUnits","userSpaceOnUse"],["x","0","y","0","width","4","height","4","fill","currentColor"],["width","220","height","192","fill","url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"],[1,"relative","z-10","w-full","max-w-2xl"],[1,"text-7xl","font-bold","leading-none","text-gray-100"],[1,"mt-6","text-lg","leading-6","tracking-tight","text-gray-400"],[1,"mt-8","flex","items-center"],[1,"flex","flex-0","items-center","-space-x-1.5"],["src","images/avatars/female-18.jpg",1,"h-10","w-10","flex-0","rounded-full","object-cover","ring-4","ring-gray-800","ring-offset-1","ring-offset-gray-800"],["src","images/avatars/female-11.jpg",1,"h-10","w-10","flex-0","rounded-full","object-cover","ring-4","ring-gray-800","ring-offset-1","ring-offset-gray-800"],["src","images/avatars/male-09.jpg",1,"h-10","w-10","flex-0","rounded-full","object-cover","ring-4","ring-gray-800","ring-offset-1","ring-offset-gray-800"],["src","images/avatars/male-16.jpg",1,"h-10","w-10","flex-0","rounded-full","object-cover","ring-4","ring-gray-800","ring-offset-1","ring-offset-gray-800"],[1,"ml-4","font-medium","tracking-tight","text-gray-400"]],template:function(s,a){if(s&1){let f=S();t(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4),l(4,"img",5),e(),t(5,"div",6),i(6," Forgot password? "),e(),t(7,"div",7),i(8," Fill the form to reset your password "),e(),c(9,oe,2,5,"fuse-alert",8),t(10,"form",9,0)(12,"mat-form-field",10)(13,"mat-label"),i(14,"Email address"),e(),l(15,"input",11),c(16,ne,2,0,"mat-error")(17,ae,2,0,"mat-error"),e(),t(18,"button",12),P("click",function(){return x(f),y(a.sendResetLink())}),c(19,se,2,0,"span")(20,le,1,2,"mat-progress-spinner",13),e(),t(21,"div",14)(22,"span"),i(23,"Return to"),e(),t(24,"a",15),i(25,"sign in "),e()()()()(),t(26,"div",16),F(),t(27,"svg",17)(28,"g",18),l(29,"circle",19)(30,"circle",20),e()(),t(31,"svg",21)(32,"defs")(33,"pattern",22),l(34,"rect",23),e()(),l(35,"rect",24),e(),b(),t(36,"div",25)(37,"div",26)(38,"div"),i(39,"Welcome to"),e(),t(40,"div"),i(41,"our community"),e()(),t(42,"div",27),i(43," Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today. "),e(),t(44,"div",28)(45,"div",29),l(46,"img",30)(47,"img",31)(48,"img",32)(49,"img",33),e(),t(50,"div",34),i(51," More than 17k people joined us, it's your turn "),e()()()()()}s&2&&(n(9),u(a.showAlert?9:-1),n(),m("formGroup",a.forgotPasswordForm),n(5),m("formControlName","email"),n(),u(a.forgotPasswordForm.get("email").hasError("required")?16:-1),n(),u(a.forgotPasswordForm.get("email").hasError("email")?17:-1),n(),m("color","primary")("disabled",a.forgotPasswordForm.disabled),n(),u(a.forgotPasswordForm.disabled?-1:19),n(),u(a.forgotPasswordForm.disabled?20:-1),n(4),m("routerLink",j(10,ie)))},dependencies:[ee,J,U,D,Q,z,W,O,Y,B,T,I,V,X,K,R,L,$,Z,N],encapsulation:2,data:{animation:q}});let r=o;return r})();var Me=[{path:"",component:te}];export{Me as default};
