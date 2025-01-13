// In-memory storage
let rooms = Array.from({ length: 5 }, (_, i) => ({
  roomNumber: i + 1,
  available: true,
}));
let bookings = [];

class bookingModel {
  constructor() {}

  /**
   * @description: Checks the value of 'room.available' is true or false.
   * @returns Boolean
   */
  findAvailableRoom() {
    return rooms.find((room) => room.available);
  }

  /**
   * @description: Checks if object with 'email' is present in 'biikings'array and returns it.
   * @param {String} email
   * @returns Object
   */
  findBookingByEmail(email) {
    return bookings.find((booking) => booking.email === email);
  }

  /**
   * @description: Model to add room booking into the system.
   * @param {Object} data
   * @returns
   */
  async bookRoom(data) {
    try {
      const { name, email, contact, checkInDate, checkOutDate } = data.body;

      if (!name || !email || !contact || !checkInDate || !checkOutDate) {
        return {
          code: 400,
          status: false,
          msg: "All fields are required",
        };
      }

      const availableRoom = this.findAvailableRoom();
      if (!availableRoom) {
        return {
          code: 400,
          status: false,
          msg: "No rooms Available",
        };
      }

      const booking = {
        name,
        email,
        contact,
        checkInDate,
        checkOutDate,
        roomNumber: availableRoom.roomNumber,
      };

      availableRoom.available = false;
      bookings.push(booking);

      return {
        code: 201,
        status: true,
        data: booking,
        msg: "Room booked successfully.",
      };
    } catch (error) {
      return {
        status: false,
        msg: "Error catched",
      };
    }
  }

  /**
   * @description: Fetches booking details based on email.
   * @param {Object} data
   * @returns
   */
  async bookingDetails(data) {
    try {
      const email = data.params.email;
      const booking = this.findBookingByEmail(email);

      if (!booking) {
        return {
          code: 404,
          status: false,
          msg: "Booking not found",
          data: {},
        };
      }

      return {
        code: 200,
        status: true,
        data: booking,
        msg: "Booking found.",
      };
    } catch (error) {
      return {
        status: false,
        msg: "Error catched",
      };
    }
  }

  /**
   * @description: Fetches list of all bookings.
   * @returns
   */
  async guestsList() {
    try {
      const guests = bookings.map(({ name, email, roomNumber }) => ({
        name,
        email,
        roomNumber,
      }));

      if (guests.length == 0) {
        return {
          code: 404,
          status: false,
          data: guests,
          msg: "Guest list is empty.",
        };
      }

      return {
        code: 200,
        status: true,
        data: guests,
        msg: "Guest list found.",
      };
    } catch (error) {
      return {
        status: false,
        msg: "Error catched",
      };
    }
  }

  /**
   * @description: Cancels existing booking.
   * @param {Object} data
   * @returns
   */
  async cancelBooking(data) {
    try {
      const { email, roomNumber } = data.body;

      const bookingIndex = bookings.findIndex(
        (booking) =>
          booking.email === email && booking.roomNumber === roomNumber
      );

      if (bookingIndex === -1) {
        return {
          code: 404,
          status: false,
          msg: "Booking not found.",
        };
      }

      const room = rooms.find((room) => room.roomNumber === roomNumber);
      if (room) {
        room.available = true;
      }

      bookings.splice(bookingIndex, 1);
      return {
        code: 200,
        status: true,
        msg: "Booking cancelled successfully.",
      };
    } catch (error) {
      return {
        status: false,
        msg: "Error catched",
      };
    }
  }

  /**
   * @description: Modifies existing booking.
   * @param {Object} data
   * @returns
   */
  async modifyBooking(data) {
    try {
      const { email, checkInDate, checkOutDate } = data.body;

      const booking = this.findBookingByEmail(email);
      if (!booking) {
        return {
          code: 404,
          status: false,
          msg: "Booking not found.",
        };
      }

      booking.checkInDate = checkInDate || booking.checkInDate;
      booking.checkOutDate = checkOutDate || booking.checkOutDate;

      return {
        code: 200,
        status: true,
        msg: "Booking modified successfully",
        data: booking,
      };
    } catch (error) {
      return {
        status: false,
        msg: "Error catched",
      };
    }
  }
}

module.exports = bookingModel;
