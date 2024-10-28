export type Customer = {
    id: number;
    rut: string;
    nombre: string;
    apellidos: string;
    direccion: {
        calle: string;
        numero: string;
        comuna: string;
        ciudad: string;
    };
    telefono: string;
};
