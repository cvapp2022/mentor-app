// import login from '../views/mentor/login.vue';
// import dashboard from '../views/mentor/dashboard.vue';
// import requests from '../views/mentor/requests.vue';
// import requestOne from '../views/mentor/requestOne.vue';
// import meetPrepare from '../views/mentor/meetPrepare.vue';
// import meetRoom from '../views/mentor/meetRoom.vue';
// import meetSet from '../views/mentor/meetSet';

function lazyLoad(view){
    return() => import(`@/views/${view}.vue`)
} 

export const mentorRoutes = [

    {
        path: '/login',
        name: 'mentorLogin',
        component: lazyLoad('mentor/login'),
        meta: {
            requireMentorGuest: true
        }
    },
    {
        path: '/dashboard',
        name: 'mentorDashboard',
        component: lazyLoad('mentor/dashboard'),
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/payments',
        name: 'mentorPayment',
        component: lazyLoad('mentor/payments'),
        meta: {
            requireMentorAuth: true
        } 
    }
]