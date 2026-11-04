import Home from '@/views/homePage';
import Login from '@/views/userLogin';
import Register from '@/views/userRegister'
import Details from '@/views/caseDetails'
import Account from '@/views/accountInfo'
import About from '@/views/aboutUs'
import Seal from '@/views/mySeal'
import Signature from '@/views/mySignature'
import Record from '@/views/sealRecord'
import Verify from '@/views/verifySignature'
import Index from '@/views/indexPage'

export default [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: Index
    },
    {
        path:'/home',
        component: Home
    },
    {
        path:'/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path:'/details',
        component: Details
    },
    {
        path:'/account',
        component: Account
    },
    {
        path:'/about',
        component: About
    },
    {
        path: '/myseal',
        component: Seal
    },
    {
        path:'/signature',
        component: Signature
    },
    {
        path:'/record',
        component: Record
    },
    {
        path: '/verify',
        component: Verify
    }
]
