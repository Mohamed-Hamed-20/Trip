import request from "supertest";
import { app, server } from "../server";

describe("GET /", () => {
  it("should return hello message", async () => {
    const res = await request(app).get("/").expect(200);
    expect(res.body.message).toContain("hello");
  });

  it("try again mohamed", async () => {
    const res = await request(app).get("/").expect(200);
    expect(res.body.message).toContain("world");
  });
  afterAll(() => {
    server.close();
  });
});
