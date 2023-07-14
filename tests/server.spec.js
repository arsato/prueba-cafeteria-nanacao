const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Status code 200 y array con al menos 1 objeto", async () => {
    const res = await request(server).get("/cafes").send();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Status code 404 al eliminar cafe con id inexistente", async () => {
    const jwt = "token";
    const idCafeAEliminar = 5;
    const res = await request(server)
      .delete(`/cafes/${idCafeAEliminar}`)
      .send()
      .set("Authorization", jwt)
      .send();
    expect(res.status).toBe(404);
  });

  it("Status code 201 al agregar cafe", async () => {
    const idCafe = Math.floor(Math.random() * 999);
    const cafe = { id: idCafe, nombre: "Cafesoso" };
    const res = await request(server).post("/cafes").send(cafe);
    expect(res.status).toBe(201);
  });

  it("Status code 400 al actualizar cafe donde id parametro sea distinto a id payload", async () => {
    const cafeAModificar = 5;
    const cafe = { id: cafeAModificar, nombre: "Nuevo Cafe" };
    const res = await request(server)
      .put(`/cafes/${cafeAModificar + 1}`)
      .send(cafe);
    expect(res.status).toBe(400);
  });
});
