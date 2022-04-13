const sql = require("../config/db.js");
//City
const userTbl = "users";
const User = function (users) {
	this.username = users.username;
    this.password = users.password;
    this.mobile = users.mobile;
    this.otp = users.otp;
    this.email = users.email;
};

User.login = ({mobile,otp}) => {
    const query = "SELECT * FROM "+userTbl+" WHERE mobile = '"+mobile+"' AND otp = '"+otp+"'";
	return sql.execute(query);
};
User.insertUser = ({username,mobile,otp,email,password}) => {
    return sql.execute("INSERT INTO "+userTbl+" (username,mobile,email,otp,password) VALUES (?,?,?,?,?)",[username,mobile,email,otp,password]);
};
User.signup = ({mobile,otp}) => {
    return sql.execute("INSERT INTO "+userTbl+" (mobile,otp) VALUES (?,?)",[mobile,otp]);
};
User.updateUser = ({mobile,otp}) => {
    const query = "UPDATE "+userTbl+" SET otp = "+otp+" WHERE mobile = "+mobile;
    return sql.execute(query);
};
User.checkUser = ({mobile}) => {
    const query = "SELECT * FROM "+userTbl+" WHERE mobile = '"+mobile+"'";
    return sql.execute(query);
};
module.exports = User;