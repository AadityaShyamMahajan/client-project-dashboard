const mongoose = require("mongoose");
const Client = require("../models/Client");

const createClient = async (req, res, next) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
};

const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid client id");
    }

    const client = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      res.status(404);
      throw new Error("Client not found");
    }

    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid client id");
    }

    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      res.status(404);
      throw new Error("Client not found");
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClient,
  getClients,
  updateClient,
  deleteClient,
};
