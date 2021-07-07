const pool = require("../../config/dtabase");

module.exports = {
  create: (data, callback) => {
     pool.query(
         `insert into registration(firstname, lastname, gender, email, password, number)
         values(?,?,?,?,?,?)`,
         [
             data.firstname,
             data.lastname,
             data.gender,
             data.email,
             data.password,
             data.number
         ],
         (error, result, fields) => {
             if(error){
                 return callback(error);
             }
             return callback(null, result);
         }
     )
  },  
  getUser: callback => {
    pool.query(`select * from registration`,
    [],
    (error, result, fields) => {
        if (error){
            return callback(error);
        }
        return callback(null, result);
    }
    )
  },
  getUserById: (id,callback) => {
     pool.query(`select * from registration where id=?`,
     [id],
     (error, result, fields) => {
        if (error){
            return callback(error);
        }
        return callback(null, result[0]);
     }
     ) 
  },
  updateUser: (data, callback) => {
      pool.query(
          `update registration set firstname=?, lastname=?, gender=?, email=?, password=?, number=? where id = ?`,
          [
            data.firstname,
            data.lastname,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
        ],
        (error, result, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null,result);
        }

      )
  },
  deleteUser: (id, callback) => {
      pool.query(
          `delete from registration where id=?`,
          [id],
          (error, result, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null,result);
          }
      )
  },
  getUserByEmail: (email,callback) => {
    pool.query(`select * from registration where email = ?`,
    [email],
    (error, result, fields) => {
       if (error){
           return callback(error);
       }
       return callback(null, result[0]);
    }
    ) 
 },
}