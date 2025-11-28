import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 * 
 * @param request - Next.js request object
 * @param params - Dynamic route parameters containing the slug
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    // Await params to handle Next.js 15+ async params
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid or missing slug parameter' 
        },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric, hyphens only)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens' 
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug with lean() for better performance
    const event: IEvent | null = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { 
          success: false,
          message: `Event with slug "${slug}" not found` 
        },
        { status: 404 }
      );
    }

    // Return successful response with event data
    return NextResponse.json(
      {
        success: true,
        message: 'Event fetched successfully',
        event
      },
      { status: 200 }
    );

  } catch (error) {
    // Log error for debugging (server-side only)
    console.error('Error fetching event by slug:', error);

    // Handle specific error types
    if (error instanceof Error) {
      // Handle mongoose validation errors
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error occurred',
            error: error.message
          },
          { status: 400 }
        );
      }

      // Handle mongoose cast errors (invalid ObjectId format, etc.)
      if (error.name === 'CastError') {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid data format',
            error: error.message
          },
          { status: 400 }
        );
      }
    }

    // Generic error response for unexpected errors
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
