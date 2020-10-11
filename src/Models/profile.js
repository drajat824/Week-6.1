const db = require("../Helper/db");

const profileModel = {

getProfile : () =>{
    return new Promise((resolve, reject) => { 
        db.query(`SELECT * FROM profile`, (err, result) => {
            if(err) {
                reject(new Error(err));
            } else{
                resolve(result);
            }
        });
    });

}, 

postProfile : (name, password, phone, email, balance, pin) => {
    return new Promise((resolve, reject) => { 
        db.query( `INSERT INTO profile (name, password, phone, email, balance, pin) 
        VALUES ('${name}', '${password}', 
            '${phone}', '${email}', '${balance}', '${pin}')`, (err, result) => {
            if(err) {
                reject(new Error(err));
            } else{
                resolve(result);
            }
        });
    });
},



patchProfile : (name, password, phone, email, balance, pin, id, data) => {

    return new Promise((resolve, reject) => { 
        db.query(`UPDATE profile SET ${data} WHERE id=${id}`, (err, result, fields) => {
            if(err) {
                reject(new Error(err));
            } else{
                resolve(result);
            }
        });
    });
},

deleteProfile : (id) => {
    return new Promise((resolve, reject) => { 
        db.query( `DELETE FROM profile where id = ${id}`, (err, result) => {
            if(err) {
                reject(new Error(err));
            } else{
                resolve(result);
            }
        });
    });
}

}

module.exports = profileModel;