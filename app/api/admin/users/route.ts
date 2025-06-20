import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getNetlifyUsers, updateNetlifyUser } from '@/lib/netlify';
import { fetchAuth0Users } from '@/lib/auth0';
import { GetUsers200ResponseOneOfInner } from 'auth0';

// Helper to check if user is admin
async function isAdmin(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');
    
    // Here you would verify the token and check admin role
    // For now, we'll just check if token exists
    return !!token;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// GET /api/admin/users
export async function GET() {
  try {
    console.log('Fetching Auth0 users...');
    const auth0Users = await fetchAuth0Users();
    console.log('Auth0 users count:', auth0Users?.length || 0);
    
    // Transform Auth0 users to match our expected format
    const users = (Array.isArray(auth0Users) ? auth0Users : []).map((user: any) => {
      const userData = {
        id: user.user_id || '',
        name: user.name || user.nickname || user.email?.split('@')[0] || 'Unknown',
        email: user.email || '',
        role: 'user', // Default all users to regular users for now
        status: user.blocked ? 'suspended' : 'active',
        joinDate: user.created_at || new Date().toISOString(),
        lastLogin: user.last_login || user.created_at || new Date().toISOString()
      };
      console.log('Transformed user:', userData);
      return userData;
    });

    console.log('Total transformed users:', users.length);
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error in users route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/admin/users/:id/role or /api/admin/users/:id/status
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is admin
    if (!await isAdmin(request)) {
      console.log('Unauthorized access attempt to users API');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await request.json();
    const userId = params.id;
    const updates: { role?: 'admin' | 'user'; status?: 'active' | 'suspended' } = {};

    console.log('Processing user action:', { userId, action });

    // Determine update type based on URL
    if (request.url.endsWith('/role')) {
      if (!['make-admin', 'remove-admin'].includes(action)) {
        console.warn('Invalid role action attempted:', action);
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
      }
      updates.role = action === 'make-admin' ? 'admin' : 'user';
    } else if (request.url.endsWith('/status')) {
      if (!['activate', 'suspend'].includes(action)) {
        console.warn('Invalid status action attempted:', action);
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
      }
      updates.status = action === 'activate' ? 'active' : 'suspended';
    }

    // Update user in Netlify
    const updatedUser = await updateNetlifyUser(userId, updates);
    
    console.log('Successfully updated user:', { userId, updates });
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error in POST /api/admin/users:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 