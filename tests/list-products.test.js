import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app.js";
import connection from "../database/database.js";

describe("List products test suit", () => {
  beforeEach(async () => {
    await connection.query(
      `INSERT INTO products ("model","brand","color","value","capacity") VALUES ('One Hyper', 'Motorola', 'Blue', 129900, '128GB');`
    );
  });
  afterAll(async () => {
    await connection.query("DELETE FROM products;");
  });
  it("returns 200 for get on '/product'", async () => {
    const result = await supertest(app).get("/product");
    expect(result.status).toEqual(200);
  });
});

afterAll(() => {
  connection.end();
});
