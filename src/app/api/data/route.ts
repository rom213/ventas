import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Función para construir la ruta del archivo JSON
function getJsonFilePath(userPath:string) {
  return path.join(process.cwd(), 'data', userPath); // Ajusta la ruta según sea necesario
}

// Función GET para leer un archivo JSON
export async function GET(req:any) {
  const { searchParams } = new URL(req.url);
  const userPath = searchParams.get('path');
  

  // Validación de parámetros
  if (!userPath) {
    return NextResponse.json({ message: 'Missing path parameter' }, { status: 400 });
  }

  try {
    const filePath = getJsonFilePath(userPath);
    const data = await fs.promises.readFile(filePath, 'utf-8');
    const users = JSON.parse(data);
    return NextResponse.json(users);
  } catch (error: any) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ message: 'Error reading JSON file', error: error.message }, { status: 500 });
  }
}


