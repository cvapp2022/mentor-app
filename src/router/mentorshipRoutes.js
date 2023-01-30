


function lazyLoad(view){
    return() => import(`@/views/${view}.vue`)
} 

export const mentorshipRoutes = [
    {
        path: '/mentorship/requests',
        name: 'mentorRequests',
        component: lazyLoad('mentorship/requests'),
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/mentorship/requests/:requestId',
        name: 'mentorRequestOne',
        component: lazyLoad('mentorship/requestOne'),
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/mentorship/requests/:requestId/meets/:meetId/set',
        name: 'mentorMeetSet',
        component: lazyLoad('mentorship/meetSet'),
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/mentorship/requests/:requestId/meets/:meetId/prepare',
        name: 'mentorMeetPrepare',
        component: lazyLoad('mentorship/meetPrepare'),
        meta: {
            requireMentorAuth: true
        }
    },
    {
        path: '/mentorship/requests/:requestId/meets/:meetId/room',
        name: 'mentorMeetRoom',
        component: lazyLoad('mentorship/meetRoom'),
        meta: {
            requireMentorAuth: true
        }
    }

]