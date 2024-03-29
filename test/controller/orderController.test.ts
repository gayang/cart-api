import request from "supertest";

//db-server
import connect, { MongoHelper } from "../db-server";

//app
import app from "../..";

//mock-data
import { loginUserByPermission } from "../mockData/loginUser";
import productData from "../mockData/productData";
import cartData from "../mockData/cartData";
import orderData from "../mockData/orderData";

// Success test cases
describe("Order Controller - Success Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should create an order", async () => {
    const token = await loginUserByPermission("PRODUCTS_CREATE");
    // product
    const { body: product } = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .send(productData[0]);
    // cart
    const { body: cartItem } = await request(app)
      .post("/api/v1/carts")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...cartData[0], product: product._id });
    // order
    const response = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...orderData, cart: [cartItem._id] });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Order created successfully");
  });

  test("should return users all orders", async () => {
    const token = await loginUserByPermission();
    const response = await request(app)
      .get("/api/v1/orders")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("should return a specific order by its id", async () => {
    const token = await loginUserByPermission();
    const { body: orders } = await request(app)
      .get("/api/v1/orders")
      .set("Authorization", `Bearer ${token}`)
      .send();
    const response = await request(app)
      .get(`/api/v1/orders/${orders[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.total).toBe(orders[0].total);
  });
});

// Failure test cases
describe("Order Controller - Failure Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should handle the case when there is no auth header", async () => {
    const response = await request(app).get("/api/v1/orders").send();
    expect(response.status).toBe(403);
  });

  test("should handle the case when invalid post data(schema) is sent", async () => {
    const token = await loginUserByPermission();
    const response = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
  });

  test("should handle the case while creating an order for invalid cart ids", async () => {
    const token = await loginUserByPermission();
    const response = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...orderData });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid cart ids.");
  });

  test("should handle the case when invalid params is sent", async () => {
    const token = await loginUserByPermission();
    const response = await request(app)
      .get(`/api/v1/orders/1`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(400);
  });

  test("should handle the case when invalid order id is sent", async () => {
    const token = await loginUserByPermission();
    const response = await request(app)
      .get(`/api/v1/orders/654cc82bda327008036fb97e`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(404);
  });
});
