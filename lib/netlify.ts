import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

interface NetlifyUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  app_metadata: {
    provider: string;
    roles?: string[];
  };
  user_metadata: {
    full_name?: string;
  };
  created_at: string;
  updated_at: string;
  confirmed_at?: string;
}

export async function getNetlifyUsers() {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token');

    if (!authToken) {
      throw new Error('No auth token found');
    }

    // Use the auth token to fetch all users from Netlify Identity
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SITE_URL}/.netlify/identity/admin/users`,
      {
        headers: {
          'Authorization': `Bearer ${authToken.value}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const users: NetlifyUser[] = await response.json();
    
    return users.map(user => ({
      id: user.id,
      name: user.user_metadata?.full_name || user.email.split('@')[0],
      email: user.email,
      role: user.app_metadata?.roles?.includes('admin') ? 'admin' : 'user',
      status: 'active', // Since we can see these users in the UI, they are active
      joinDate: new Date(user.created_at).toISOString().split('T')[0],
      lastLogin: new Date(user.updated_at).toISOString().split('T')[0]
    }));
  } catch (error) {
    console.error('Error in getNetlifyUsers:', error);
    throw error;
  }
}

export async function updateNetlifyUser(userId: string, updates: {
  role?: 'admin' | 'user';
  status?: 'active' | 'suspended';
}) {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token');

    if (!authToken) {
      throw new Error('No auth token found');
    }

    const updateData: any = {};
    
    if (updates.role) {
      updateData.app_metadata = {
        roles: updates.role === 'admin' ? ['admin'] : []
      };
    }

    // Make the update request to Netlify Identity
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SITE_URL}/.netlify/identity/admin/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken.value}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.status}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error in updateNetlifyUser:', error);
    throw error;
  }
} 