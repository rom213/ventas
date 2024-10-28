import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import users from "@/data/clientes.json";
import productos from "@/data/productos.json";
import sucursales from "@/data/sucursales.json";
import ventas from "@/data/ventas.json";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const userOpcion = searchParams.get('path');

  if (!userOpcion) {
    return NextResponse.json({ message: 'Missing option parameter' }, { status: 400 });
  }

  try {
    let responseData;
    switch (userOpcion) {
      case 'usuarios':
        responseData = users;
        break;
      case 'productos':
        responseData = productos;
        break;
      case 'sucursales':
        responseData = sucursales;
        break;
      case 'ventas':
        responseData = ventas;
        break;
      default:
        return NextResponse.json({ message: 'Invalid path parameter' }, { status: 400 });
    }
    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ message: 'Error reading JSON file', error: error.message }, { status: 500 });
  }
}


export async function POST(req: any) {
  try {
    const requestBody = await req.json();
    const { path: requestPath, data } = requestBody;

    if (requestPath === 'ventas') {
      data.id=ventas.length;
      ventas.push(data);

      const ventasPath = path.join(process.cwd(), 'src/data/ventas.json');
      fs.writeFileSync(ventasPath, JSON.stringify(ventas, null, 2), 'utf-8');

      return NextResponse.json({ message: 'Venta agregada exitosamente' });
    } else {
      return NextResponse.json({ message: 'Ruta inválida, solo se permite ventas' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error al agregar la venta:', error);
    return NextResponse.json({ message: 'Error al agregar la venta', error: error.message }, { status: 500 });
  }
}






