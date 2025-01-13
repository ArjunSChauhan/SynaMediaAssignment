const request = require("supertest");
const app = require("../routes/bookingRoutes");

const testBooking = {
  name: "Arjun Singh",
  email: "arjun.singh@example.com",
  contact: "1234567890",
  checkInDate: "2025-01-15",
  checkOutDate: "2025-01-20",
};

describe("Hotel Booking System APIs", () => {
  it("should book a room successfully", async () => {
    const response = await request(app).post("/book-room").send(testBooking);
    console.log("Response :: ", response);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Room booked successfully.");
    expect(response.body.data).toHaveProperty("roomNumber");
  });

  it("should retrieve booking details by email", async () => {
    const response = await request(app).get(
      `/booking-details/${testBooking.email}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: testBooking.name,
      email: testBooking.email,
    });
  });

  it("should return 404 if booking details are not found", async () => {
    const response = await request(app).get(
      "/booking-details/nonexistent@example.com"
    );

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Booking not found");
  });

  it("should return all guests currently in the hotel", async () => {
    const response = await request(app).get("/guests");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: testBooking.name,
          roomNumber: expect.any(Number),
        }),
      ])
    );
  });

  it("should cancel a booking successfully", async () => {
    const response = await request(app)
      .delete("/cancel-booking")
      .send({ email: testBooking.email, roomNumber: 1 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Booking cancelled successfully");
  });

  it("should return 404 if booking to cancel is not found", async () => {
    const response = await request(app)
      .delete("/cancel-booking")
      .send({ email: "nonexistent@example.com", roomNumber: 999 });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Booking not found.");
  });

  it("should modify a booking successfully", async () => {
    await request(app).post("/book-room").send(testBooking);
    const response = await request(app).put("/modify-booking").send({
      email: testBooking.email,
      checkInDate: "2025-01-16",
      checkOutDate: "2025-01-21",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Booking modified successfully");
    expect(response.body.booking).toMatchObject({
      checkInDate: "2025-01-16",
      checkOutDate: "2025-01-21",
    });
  });

  it("should return 404 if booking to modify is not found", async () => {
    const response = await request(app)
      .put("/modify-booking")
      .send({ email: "nonexistent@example.com", checkInDate: "2025-01-16" });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Booking not found.");
  });
});
