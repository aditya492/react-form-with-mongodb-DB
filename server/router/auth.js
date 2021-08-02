const express = require("express");
const router = express.Router();

require("../db/conn");

const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Router this Side!");
});

//creating register route

router.post("/register", (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  console.log(req.body);

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "email already used!" });
      }

      const user = new User({
        name: name,
        email: email,
        phone: phone,
        work: work,
        password: password,
        cpassword: cpassword,
      });

      user
        .save()
        .then((resp) => {
          res.status(201).json({ message: "Registered Successfully!" });
        })
        .catch((err) => {
          res.status(500).json({ message: "Error ! Failed Registered" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//creating signin route

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "please fill all details" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    res.json({ messgae: "User signin Successfully!!!" });
  } catch (err) {
    console.log(err);
  }

  // usernew
  //   .save()
  //   .then((resp) => {
  //     res.status(201).json({ message: "Registered Successfully!" });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ message: "Error ! Failed Registered" });
  //   });
});

module.exports = router;
