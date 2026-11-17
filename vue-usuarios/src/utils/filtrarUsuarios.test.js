
import { describe, it, expect } from "vitest";
import { filtrarUsuarios } from "./filtrarUsuarios.js";

describe("Prueba del buscador de usuarios", () => {
  it("debe encontrar un usuario por su nombre", () => {

    const usuarios = [
      { id: 1, name: "Sofia Ramirez" },
      { id: 2, name: "Daniel Torres" },
      { id: 3, name: "Valeria Castro" }
    ];

    const resultado = filtrarUsuarios(usuarios, "sofia");

    expect(resultado.length).toBe(1);
    expect(resultado[0].name).toBe("Sofia Ramirez");

  });
});
