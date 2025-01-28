import { createRouter, createWebHistory } from 'vue-router'
import SpaceTravel from '@/views/SpaceTravel.vue'
import GetReservations from "@/views/GetReservations.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: SpaceTravel
    },
    {
        path: '/reservations',
        name: 'reservations',
        component: GetReservations
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})