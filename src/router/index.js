import { createRouter, createWebHistory } from 'vue-router';

const HomePage = () => import('@/views/HomePage.vue');
const TheDashboard = () => import('@/views/TheDashboard.vue');
const TheLeadership = () => import ('@/views/TheLeadership.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            component: HomePage 
        },
        { 
            name: 'dashboard',
            path: '/dashboard', 
            component: TheDashboard 
        },
        { 
            name: 'leadership',
            path: '/leadership', 
            component: TheLeadership 
        },
        { 
            path: '/:notFound(.*)', 
            redirect: '/' 
        }
    ]
});

// Navigation Guards:
// router.beforeEach(function(to, _, next) { // (to, from, next)
//     if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
//         next('/auth');
//     } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
//         next('/coaches');
//     } else {
//         next();
//     }
// });

export default router;