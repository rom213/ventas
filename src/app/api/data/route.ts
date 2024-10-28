import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

// Function to build the JSON file path
function getJsonFilePath(userPath: string) {
  return path.join(process.cwd(), 'data', userPath); // Adjust the path as necessary
}

// GET function to read a JSON file
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userPath = searchParams.get('path');

  // Validate parameters
  if (!userPath) {
    return NextResponse.json({ message: 'Missing path parameter' }, { status: 400 });
  }

  try {
    const filePath = getJsonFilePath(userPath);
    const data = await fs.promises.readFile(filePath, 'utf-8');
    const users = JSON.parse(data);
    return NextResponse.json(users);
  } catch (error: unknown) {
    // Type assertion for the error to get the message
    if (error instanceof Error) {
      console.error('Error reading JSON file:', error);
      return NextResponse.json({ message: 'Error reading JSON file', error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ message: 'Unexpected error occurred' }, { status: 500 });
    }
  }
}
