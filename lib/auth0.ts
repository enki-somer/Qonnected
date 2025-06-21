import { ManagementClient } from 'auth0';

let managementClient: ManagementClient | null = null;

export const getManagementClient = () => {
  if (!managementClient) {
    if (!process.env.NEXT_PUBLIC_AUTH0_DOMAIN) {
      throw new Error('NEXT_PUBLIC_AUTH0_DOMAIN is not set');
    }
    if (!process.env.AUTH0_MANAGEMENT_API_TOKEN) {
      throw new Error('AUTH0_MANAGEMENT_API_TOKEN is not set');
    }
    
    managementClient = new ManagementClient({
      domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string,
      token: process.env.AUTH0_MANAGEMENT_API_TOKEN as string
    });
  }
  return managementClient;
};

export const fetchAuth0Users = async () => {
  try {
    const management = getManagementClient();
    
    // Get first page of users with pagination
    const params = {
      page: 0,
      per_page: 100,
      include_totals: true,
      fields: 'user_id,name,email,nickname,created_at,last_login,blocked,app_metadata'
    };
    
    console.log('Fetching users with params:', params);
    const response = await management.users.getAll(params);
    
    // Extract data from JSONApiResponse
    const users = response && typeof response === 'object' && 'data' in response 
      ? (response.data as any[]) 
      : Array.isArray(response) 
        ? response 
        : [];

    console.log('Extracted users:', users);
    return users;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    // Check if token is invalid
    if (typeof error.message === 'string' && error.message.includes('invalid_token')) {
      console.error('Invalid Auth0 Management API token. Please check your configuration.');
    }
    throw error;
  }
}; 