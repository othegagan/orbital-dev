import authAxios from '@/lib/AxiosService';

// Function to search for data via API
export const searchForData = async () => {
    try {
        // Prepare URL
        const url = process.env.API_BASEURL + '/some-end-point';

        // Perform API call
        const response = await authAxios.get(url);

        // Check response status
        if (response.status === 200) {
            // Return data if status is OK
            return response.data;
        } else {
            // Handle other status codes
            console.error('Unexpected response status:', response.status);
            throw new Error('Failed to retrieve  data. Unexpected response status.');
        }
    } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error occurred while calling API:', error);
        throw new Error('Failed to retrieve  data. Please try again.');
    }
};
