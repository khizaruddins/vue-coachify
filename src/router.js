import { createRouter, createWebHistory  } from 'vue-router';
import{ defineAsyncComponent } from 'vue';


// import CoachDetail from './pages/coaches/CoachDetail.vue';
// import CoachList from './pages/coaches/CoachList.vue';
// import CoachRegister from './pages/coaches/CoachRegister.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
// import NotFound from './pages/NotFound.vue';

const CoachDetail = defineAsyncComponent(()=>import('./pages/coaches/CoachDetail.vue'));
const CoachList = defineAsyncComponent(()=> import('./pages/coaches/CoachList.vue'));
const CoachRegister  = defineAsyncComponent(()=> import('./pages/coaches/CoachRegister.vue'));
const ContactCoach = defineAsyncComponent(()=> import('./pages/requests/ContactCoach.vue'));
const RequestsReceived = defineAsyncComponent(()=> import('./pages/requests/RequestsReceived.vue'));
const UserAuth = defineAsyncComponent(()=> import('./pages/auth/UserAuth.vue'));
const NotFound = defineAsyncComponent(()=> import('./pages/NotFound.vue'));
import store from './store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path:'/', redirect: '/coaches'},
    { path: '/coaches', component: CoachList },
    { path: '/coaches/:id', component: CoachDetail, props: true, 
      children:[
        {path: 'contact', component: ContactCoach}
      ] 
    },
    { path: '/register', component: CoachRegister, meta: { requireAuth: true } },
    { path: '/requests', component: RequestsReceived, meta: {requireAuth: true} },
    { path: '/auth', component: UserAuth, meta: { requireUnAuth: true} },
    { path: '/:notFound(.*)', component: NotFound },
    
  ]
});

router.beforeEach((to, _, next) => {
    if(to.requireAuth && !store.getters.isAuthenticated){
      next('/auth');
    } else if (to.requireUnAuth && store.getters.isAuthenticated){
      next('/coaches');
    } else {
      next();
    }
})

export default router;