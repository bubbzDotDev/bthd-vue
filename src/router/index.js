import { createRouter, createWebHistory } from 'vue-router';

const HomePage = () => import('@/views/HomePage.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            component: HomePage 
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