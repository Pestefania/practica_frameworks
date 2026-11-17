
import { describe, it, expect } from "vitest";
import { filtrarUsuarios } from "./filtrarUsuarios";

describe("Prueba de búsqueda", () => {
  it("busca un usuario por su nombre", () => {
    const usuarios = [
      { id: 1, name: "Araceli Lopez" },
      { id: 2, name: "Juan Loja" },
      { id: 3, name: "Rosa Pineda" }
    ];

    const resultado = filtrarUsuarios(usuarios, "araceli");

    expect(resultado.length).toBe(1);
    expect(resultado[0].name).toBe("Araceli Lopez");
  });
});
