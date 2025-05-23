import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This would be your database interaction
const mockDb = {
  certifications: [
    {
      id: 'cert-1',
      name: 'Advanced Web Development',
      description: 'Learn advanced web development techniques and best practices',
      price: '$99',
      image: '/images/certifications/web-dev.jpg',
      enrolledCount: 45,
      completionCount: 32,
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: 'cert-2',
      name: 'UI/UX Design Fundamentals',
      description: 'Master the fundamentals of UI/UX design',
      price: '$149',
      image: '/images/certifications/ui-ux.jpg',
      enrolledCount: 28,
      completionCount: 15,
      status: 'active',
      createdAt: '2024-02-01',
    },
    // Add more mock data
  ],
};

// Helper to check if user is admin
async function isAdmin(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');
  
  // Here you would verify the token and check admin role
  // For now, we'll just check if token exists
  return !!token;
}

// GET /api/admin/certifications
export async function GET(request: Request) {
  // Check if user is admin
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get query parameters
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase();

  // Filter certifications based on search query
  let certifications = mockDb.certifications;
  
  if (search) {
    certifications = certifications.filter(cert => 
      cert.name.toLowerCase().includes(search) ||
      cert.description.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ certifications });
}

// POST /api/admin/certifications
export async function POST(request: Request) {
  // Check if user is admin
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    
    // Here you would:
    // 1. Upload the image to your storage service
    // 2. Create the certification in your database
    // 3. Return the created certification

    const newCertification = {
      id: `cert-${Date.now()}`,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      image: '/images/certifications/placeholder.jpg',
      enrolledCount: 0,
      completionCount: 0,
      status: formData.get('status') as string,
      createdAt: new Date().toISOString(),
    };

    // Validate required fields
    if (!newCertification.name || !newCertification.description || !newCertification.price || !newCertification.status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    mockDb.certifications.push(newCertification);
    
    return NextResponse.json({ certification: newCertification });
  } catch (error) {
    console.error('Error creating certification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/certifications/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if user is admin
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const certificationId = params.id;

    // Find certification
    const certification = mockDb.certifications.find(c => c.id === certificationId);
    if (!certification) {
      return NextResponse.json(
        { error: 'Certification not found' },
        { status: 404 }
      );
    }

    // Here you would:
    // 1. Upload the new image if provided
    // 2. Update the certification in your database
    // 3. Return the updated certification

    Object.assign(certification, {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      status: formData.get('status'),
      // image would be updated if a new one was uploaded
    });

    return NextResponse.json({ certification });
  } catch (error) {
    console.error('Error updating certification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/certifications/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if user is admin
  if (!await isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const certificationId = params.id;

    // Find certification index
    const index = mockDb.certifications.findIndex(c => c.id === certificationId);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Certification not found' },
        { status: 404 }
      );
    }

    // Here you would:
    // 1. Delete the certification image from storage
    // 2. Delete the certification from your database
    // 3. Handle any cleanup (enrolled users, etc.)

    mockDb.certifications.splice(index, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting certification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 