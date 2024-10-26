const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Configuración de la cantidad de datos
const numProductos = 1000;
const numSucursales = 10;
const numClientes = 1000;
const numVentas = 5;

// Generar sucursales
const sucursales = [];
const paises = ['Chile', 'Argentina', 'Perú', 'Brasil', 'Colombia', 'México', 'Uruguay', 'Paraguay', 'Ecuador', 'Venezuela'];
const monedas = ['CLP', 'ARS', 'PEN', 'BRL', 'COP', 'MXN', 'UYU', 'PYG', 'USD', 'VES'];

for (let i = 0; i < numSucursales; i++) {
  sucursales.push({
    id: i + 1,
    pais: paises[i],
    moneda: monedas[i]
  });
}

// Generar productos
const productos = [];
for (let i = 0; i < numProductos; i++) {
  productos.push({
    id: i + 1,
    nombre: faker.commerce.productName(),
    precio: faker.number.int({ min: 1000, max: 10000 }),  
    stock: faker.number.int({ min: 0, max: 100 }),        
    proveedor_id: faker.number.int({ min: 1, max: 10 }),  
    sucursal_id: faker.number.int({ min: 1, max: numSucursales })  
  });
}

// Generar clientes
const clientes = [];
for (let i = 0; i < numClientes; i++) {
  clientes.push({
    id: i + 1,
    rut: faker.defaultRefDate(),
    nombre: faker.name.firstName(),
    apellidos: faker.name.lastName(),
    direccion: {
      calle: faker.address.countryCode(),
      numero: faker.address.buildingNumber(),
      comuna: faker.address.city(),
      ciudad: faker.address.city()
    },
    telefono: faker.phone.number('+56 9 ########')
  });
}

// Generar vendedores
const vendedores = [];
for (let i = 0; i < 20; i++) {
  vendedores.push({
    id: i + 1,
    rut: faker.location.secondaryAddress(),
    nombre: faker.name.firstName(),
    apellidos: faker.name.lastName(),
    direccion: {
      calle: faker.address.countryCode(),
      numero: faker.address.city(),
      comuna: faker.address.city(),
      ciudad: faker.address.city()
    },
    telefono: faker.phone.number('+56 9 ########'),
    fecha_nacimiento: faker.date.past(30, new Date('2000-01-01')).toISOString().split('T')[0],
    email: faker.internet.email()
  });
}

// Generar ventas
const ventas = [];
for (let i = 0; i < numVentas; i++) {
  const clienteId = faker.number.int({ min: 1, max: numClientes });
  const vendedorId = faker.number.int({ min: 1, max: 20 });
  const sucursalId = faker.number.int({ min: 1, max: numSucursales });
  const numDetalles = faker.number.int({ min: 1, max: 5 });
  
  const detalles = [];
  let montoTotal = 0;
  
  for (let j = 0; j < numDetalles; j++) {
    const productoId = faker.number.int({ min: 1, max: numProductos });
    const cantidad = faker.number.int({ min: 1, max: 10 });
    const precioUnitario = productos.find(p => p.id === productoId).precio;
    const subtotal = cantidad * precioUnitario;
    
    detalles.push({
      producto_id: productoId,
      cantidad: cantidad,
      precio_unitario: precioUnitario,
      subtotal: subtotal
    });
    
    montoTotal += subtotal;
  }
  
  ventas.push({
    id: i + 1,
    fecha: faker.date.recent().toISOString().split('T')[0],
    vendedor_id: vendedorId,
    cliente_id: clienteId,
    sucursal_id: sucursalId,
    monto_total: montoTotal,
    moneda: sucursales.find(s => s.id === sucursalId).moneda,
    detalle: detalles
  });
}

// Guardar archivos JSON
fs.writeFileSync('sucursales.json', JSON.stringify(sucursales, null, 2));
fs.writeFileSync('productos.json', JSON.stringify(productos, null, 2));
fs.writeFileSync('clientes.json', JSON.stringify(clientes, null, 2));
fs.writeFileSync('vendedores.json', JSON.stringify(vendedores, null, 2));
fs.writeFileSync('ventas.json', JSON.stringify(ventas, null, 2));

console.log("Datos generados y guardados en archivos JSON.");
