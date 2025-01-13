const logger = require("../logs/logger.js");
const createResponse = require("../utils/createResponse");
const loggerResponse = require("../utils/loggerResponse.js");
const errorResponse = require("../utils/errorResponse");

const bookingModel = new (require("../model/BookingModel.js"))();

class BookingController {
  constructor() {}
  /**
   * @description: Controller for room booking Model.
   * @param {*} req
   * @param {*} res
   */
  async bookRoom(req, res) {
    try {
      const result = await bookingModel.bookRoom(req);
      if (result.status) {
        logger.info(loggerResponse(result.code, req.OriginalUrl, result.msg));

        createResponse(result.data, result.code, result.msg, res);
      } else {
        logger.error(loggerResponse(result.code, req.OriginalUrl, result.msg));
        errorResponse(result.msg, result.code, res);
      }
    } catch (error) {
      logger.error(loggerResponse(500, req.OriginalUrl, error));
      createResponse({}, 500, "Error Catched!", res);
    }
  }

  /**
   * @description: Controller for booking details model.
   * @param {*} req
   * @param {*} res
   */
  async bookingDetails(req, res) {
    try {
      const result = await bookingModel.bookingDetails(req);
      if (result.status) {
        logger.info(loggerResponse(result.code, req.OriginalUrl, result.msg));
        createResponse(result.data, result.code, result.msg, res);
      } else {
        if (result.code == 404) {
          logger.info(loggerResponse(result.code, req.OriginalUrl, result.msg));
          createResponse(result.data, result.code, result.msg, res);
        } else {
          logger.error(
            loggerResponse(result.code, req.OriginalUrl, result.msg)
          );
          errorResponse(result.msg, result.code, res);
        }
      }
    } catch (error) {
      logger.error(loggerResponse(500, req.OriginalUrl, error));
      createResponse({}, 500, "Error Catched!", res);
    }
  }

  /**
   * @description: Controller for guest's list model.
   * @param {*} req
   * @param {*} res
   */
  async guestsList(req, res) {
    try {
      const result = await bookingModel.guestsList();
      if (result.status) {
        logger.info(loggerResponse(result.code, req.OriginalUrl, result.msg));
        createResponse(result.data, result.code, result.msg, res);
      } else {
        if (result.code == 404) {
          logger.info(loggerResponse(result.code, req.OriginalUrl, result.msg));
          createResponse(result.data, result.code, result.msg, res);
        } else {
          logger.error(
            loggerResponse(result.code, req.OriginalUrl, result.msg)
          );
          errorResponse(result.msg, result.code, res);
        }
      }
    } catch (error) {
      logger.error(loggerResponse(500, req.OriginalUrl, error));
      createResponse({}, 500, "Error Catched!", res);
    }
  }

  /**
   * @description: Controller for booking cancelation model.
   * @param {*} req
   * @param {*} res
   */
  async cancelBooking(req, res) {
    try {
      const result = await bookingModel.cancelBooking(req);
      if (result.status) {
        logger.info(loggerResponse(result.code, req.OriginalUrl, result.msg));
        createResponse(result.data, result.code, result.msg, res);
      } else {
        if (result.code == 404) {
          logger.info(loggerResponse(result.code, req.OriginalUrl, result.msg));
          createResponse(result.data, result.code, result.msg, res);
        } else {
          logger.error(
            loggerResponse(result.code, req.OriginalUrl, result.msg)
          );
          errorResponse(result.msg, result.code, res);
        }
      }
    } catch (error) {
      logger.error(loggerResponse(500, req.OriginalUrl, error));
      createResponse({}, 500, "Error Catched!", res);
    }
  }

  /**
   * @description: Controller for modify booking model.
   * @param {*} req
   * @param {*} res
   */
  async modifyBooking(req, res) {
    try {
      const result = await bookingModel.modifyBooking(req);
      if (result.status) {
        logger.info(loggerResponse(result.code, req.OriginalUrl, result.msg));
        createResponse(result.data, result.code, result.msg, res);
      } else {
        if (result.code == 404) {
          logger.info(loggerResponse(result.code, req.OriginalUrl, result.msg));
          createResponse(result.data, result.code, result.msg, res);
        } else {
          logger.error(
            loggerResponse(result.code, req.OriginalUrl, result.msg)
          );
          errorResponse(result.msg, result.code, res);
        }
      }
    } catch (error) {
      logger.error(loggerResponse(500, req.OriginalUrl, error));
      createResponse({}, 500, "Error Catched!", res);
    }
  }
}

module.exports = BookingController;
