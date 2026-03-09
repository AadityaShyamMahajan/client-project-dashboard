const express = require("express");
const {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const router = express.Router();

router.route("/").post(createClient).get(getClients);
router.route("/:id").put(updateClient).delete(deleteClient);

module.exports = router;
