import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
export class AnalyticsService {
    async trackEvent(eventName: string, eventParams: Record<string, any> = {}) {
    const measurementId = process.env.MEASUREMENT_ID;
    const apiSecret = process.env.API_SECRET;
    const endpoint = `https://www.google-analytics.com/mp/collect`;
  
    const payload = {
      client_id: 'XXXXXXXXXX.YYYYYYYYYY',
      events: [
        {
          name: eventName,
          params: eventParams,
        },
      ],
    };
  
    try {
      const response = await axios.post(endpoint, payload, {
        params: {
          measurement_id: measurementId,
          api_secret: apiSecret,
        },
      });
  
      console.log('Google Analytics API response:', response.data);
    } catch (error) {
      console.error('Failed to send event to Google Analytics:', error.response);
    }
  
    console.log('Data sent to Google Analytics:', JSON.stringify(payload));
  }
}
