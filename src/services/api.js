import { API_ENDPOINTS } from '@/config';
import axios from 'axios';

export const travelService = {
    async getTravelPrices() {
        const response = await fetch(API_ENDPOINTS.TRAVEL_PRICES);
        return response.json();
    },

    async saveReservation(data) {
        console.log('API call data:', data);

        const response = await axios.post(API_ENDPOINTS.RESERVATION, data);
        return response.data;
    },

    async getReservations(data) {
        const response = await axios.get(API_ENDPOINTS.GET_RESERVATION, {
            params: {
                firstName: data.firstName,
                lastName: data.lastName
            }
        });
        return response.data;
    },

};