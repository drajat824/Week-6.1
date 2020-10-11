const db = require("../Helper/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = {
    register: (body) => {
        return new Promise((resolve, reject) => {
          bcrypt.genSalt(10, function (err, salt) {
            const { password } = body;
            bcrypt.hash(password, salt, function (err, hashedPassword) {
              const newBody = { ...body, password: hashedPassword };
              if (err) {
                reject(err);
              }
              const query = "INSERT INTO account SET ?";
              db.query(query, newBody, (err, data) => {
                if (!err) {
                  resolve(newBody);
                } else {
                  reject(err);
                }
              });
            });
          });
        });
      },

      login: (body) => {

        return new Promise((resolve, reject) => {
          const { email, password } = body;

          const query = "SELECT * FROM account WHERE email=?";

          db.query(query, email, (err, data) => {
            let dataUser = data[0];
            if (!data.length) {
              reject("Email Salah.");
            } else {
              if (!err) {
                const token = jwt.sign(
                  {
                    id: dataUser.id,
                    status: dataUser.status,
                    email: dataUser.email,                                       
                  },
                  process.env.SECRET_KEY
                );

                bcrypt.compare(password, dataUser.password, function (err, result) {
                    console.log(dataUser.password)
                  if (err) {
                    reject(err);
                  } else {
                    if (!result) {
                        reject('Password Salah!');
                    } else {
                      const sql = "SELECT * FROM profile WHERE password=?";
                      db.query(sql, dataUser.password, (err, data) => {
                        if (!err) {
                          resolve(token);
                          console.log(result)
                        } else {
                          reject("Password Salah");
                        }
                      });
                    }
                  }
                });
              } else {
                reject(err);
              }
            }
          });
        });
      },
};

module.exports = authModel;
