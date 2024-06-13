/**
 * Vue Router
 * @description: Vue Router configuration
 * @docs: https://router.vuejs.org/
 */
import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import TutorialManagementComponent from "../learning/pages/tutorial-management.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/home",    name: 'home',       component: HomeComponent,               meta: { title: "Home"}},
        { path: '/tutorials',                   component: TutorialManagementComponent, meta: { title: 'Tutorials' } },
        { path: '/sign-in', name: 'sign-in',    component: SignInComponent,             meta: { title: 'Sign In' } },
        { path: '/sign-up', name: 'sign-up',    component: SignUpComponent,             meta: { title: 'Sign Up' } },
        { path: "/about",                       component: AboutComponent,              meta: { title: "About us"}},
        { path: "/",        redirect: "/home"},
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'ACME Learning Center';
    document.title = `${baseTitle} | ${to.meta['title']}}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
});

export default router;