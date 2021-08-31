import { createRouter, createWebHistory } from 'vue-router';

const HomePage = () => import('@/views/HomePage.vue');
const TheDashboard = () => import('@/views/TheDashboard.vue');
const TheLeadership = () => import('@/views/TheLeadership.vue');
const UserProfile = () => import('@/components/dashboard/UserProfile.vue');
const DashboardHome = () => import('@/components/dashboard/DashboardHome.vue');
const SignUp = () => import('@/components/dashboard/SignUp.vue');
const ManageClans = () => import('@/components/dashboard/ManageClans.vue');
const ManageStaff = () => import('@/components/dashboard/ManageStaff.vue');
const ManageMembers = () => import('@/components/dashboard/ManageMembers.vue');
const ManageBOTM = () => import('@/components/dashboard/ManageBOTM.vue');
const ManageBOTY = () => import('@/components/dashboard/ManageBOTY.vue');
const ManageLeadership = () => import('@/components/dashboard/ManageLeadership.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: TheDashboard,
      children: [
          {
              name: 'dashboard-home',  
              path: '',
              component: DashboardHome
          },
          {
              name: 'signup',
              path: '/signup',
              component: SignUp
          },
          {
              name: 'profile',
              path: '/profile',
              component: UserProfile
          },
          {
              name: 'manage-clans',
              path: 'clans',
              component: ManageClans
          },
          {
              name: 'manage-staff',
              path: 'staff',
              component: ManageStaff
          },
          {
              name: 'manage-members',
              path: 'members',
              component: ManageMembers
          },
          {
              name: 'manage-botm',
              path: 'botm',
              component: ManageBOTM
          },
          {
              name: 'manage-boty',
              path: 'boty',
              component: ManageBOTY
          },
          {
              name: 'manage-leadership',
              path: 'leadership',
              component: ManageLeadership
          }
      ]
    },
    {
      name: 'leadership',
      path: '/leadership',
      component: TheLeadership,
    },
    {
      path: '/:notFound(.*)',
      redirect: '/',
    },
  ],
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