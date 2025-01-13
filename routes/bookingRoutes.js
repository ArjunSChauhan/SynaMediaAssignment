const express = require("express");
const router = express.Router();

const BookingController = new (require("../controller/bookingController"))();

router.post("/book-room", BookingController.bookRoom);
router.get("/booking-details/:email", BookingController.bookingDetails);
router.get("/guests", BookingController.guestsList);
router.delete("/cancel-booking", BookingController.cancelBooking);
router.put("/modify-booking", BookingController.modifyBooking);

module.exports = router;
