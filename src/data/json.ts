
import fs from 'fs';


export function readJson(path: string):any[] {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
}

// Función para escribir en el archivo JSON
export function writeJson(path: string, data: any): void {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}