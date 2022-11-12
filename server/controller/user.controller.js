const config = require('../config/auth.config');
const qs = require('qs');
const axios = require('axios');

const getUsers = async (req, res) => {
  url = `${process.env.BASE_URL}/Accounts/${config.accountSID}/OutgoingCallerIds.json?PageSize=${process.env.PAGE_SIZE}`;
  const response = await axios
    .get(url, {
      auth: {
        username: config.accountSID,
        password: config.authToken,
      },
    })
    .catch((error) => {
      console.log(error);
    });
  var data = [];
  for (let num in response.data.outgoing_caller_ids) {
    data.push({
      phone_number: response.data.outgoing_caller_ids[num].phone_number,
      sid: response.data.outgoing_caller_ids[num].sid,
    });
  }
  res.json({ data });
};

const addUser = async (req, res) => {
  const body = qs.stringify({
    FriendlyName: req.body.friendly_name,
    PhoneNumber: req.body.phone_number,
  });
  url = `${process.env.BASE_URL}/Accounts/${config.accountSID}/OutgoingCallerIds.json`;
  const response = await axios
    .post(url, body, {
      auth: {
        username: config.accountSID,
        password: config.authToken,
      },
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).send({ code: response.data.validation_code });
};

const deleteUser = async (req, res) => {
  url = `${process.env.BASE_URL}/Accounts/${config.accountSID}/OutgoingCallerIds/${req.body.sid}.json`;
  const response = await axios
    .delete(url, {
      auth: {
        username: config.accountSID,
        password: config.authToken,
      },
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).send({ message: 'Phone Number successfully removed' });
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
};
