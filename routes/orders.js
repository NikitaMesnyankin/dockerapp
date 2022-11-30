const express = require("express");
const orders = require("../queries/orders");
const { permit } = require("../queries/auth");
const ordersRouter = express.Router();

ordersRouter.get("/", permit(["ADMIN", "MANAGER"]), orders.getOrders);
ordersRouter.get("/:id", permit(["ADMIN", "CLIENT", "COURIER", "MANAGER"]), orders.getOrderById);
ordersRouter.post("/", permit(["ADMIN", "CLIENT", "MANAGER"]), orders.checkAvailability, orders.createOrder);
ordersRouter.patch("/:id", permit(["ADMIN", "CLIENT", "MANAGER"]), orders.updateOrder);
ordersRouter.delete("/:id", permit(["ADMIN", "CLIENT", "MANAGER"]), orders.deleteOrder);

module.exports = {
	ordersRouter
};
