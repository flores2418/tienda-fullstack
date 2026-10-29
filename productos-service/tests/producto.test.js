import { describe, it, expect } from 'vitest';
import { validarProducto } from '../src/domain/producto.js';

describe('validarProducto', () => {
  it('acepta un producto correcto', () => {
    const errores = validarProducto({ nombre: 'Camiseta', precio: 500, stock: 10 });
    expect(errores).toEqual([]);
  });

  it('rechaza un producto sin nombre', () => {
    const errores = validarProducto({ precio: 500 });
    expect(errores).toContain('El nombre es obligatorio');
  });

  it('rechaza un precio negativo', () => {
    const errores = validarProducto({ nombre: 'Camiseta', precio: -5 });
    expect(errores).toContain('El precio debe ser un número mayor o igual a 0');
  });

  it('rechaza un stock con decimales', () => {
    const errores = validarProducto({ nombre: 'Camiseta', precio: 500, stock: 2.5 });
    expect(errores).toContain('El stock debe ser un número entero mayor o igual a 0');
  });
});