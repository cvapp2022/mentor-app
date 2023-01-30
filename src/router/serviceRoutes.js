


function lazyLoad(view){
    return() => import(`@/views/${view}.vue`)
} 

export const serviceRoutes = [
    {
        path: '/service/',
        name: 'servicesMain',
        component: lazyLoad('service/servicesMain'),
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/service/requests',
        name: 'serviceRequests',
        component: lazyLoad('service/requests'),
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/service/requests/:requestId',
        name: 'servRequestOne',
        component: lazyLoad('service/requestOne'),
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/service/requests/:requestId/resumes/:cvId',
        name: 'cvOne',
        component: lazyLoad('service/cv/cvOne'),
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/service/requests/:requestId/cover-letters/:clId',
        name: 'clOne',
        component: lazyLoad('service/cl/clOne'),
        meta: {
            requireMentorAuth: true
        }  
    }

]