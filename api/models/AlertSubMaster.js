const sql = require("../config/db.js");

const userTbl = "alert_type_sub_master";
const AlertSubMaster = function (alerts) {
    this.alert_type_id = alerts.alert_type_id;
	this.name = alerts.name;
    this.description = alerts.description;
};

AlertSubMaster.getSubAlertType = (alertTypeId) => {
    const query = "SELECT * FROM "+userTbl+" WHERE alert_type_id = '"+alertTypeId+"'";
	return sql.execute(query);
};
/* User.insertUser = ({username,mobile,otp,email,password}) => {
    return sql.execute("INSERT INTO "+userTbl+" (username,mobile,email,otp,password) VALUES (?,?,?,?,?)",[username,mobile,email,otp,password]);
};
User.signup = ({mobile,otp}) => {
    return sql.execute("INSERT INTO "+userTbl+" (mobile,otp) VALUES (?,?)",[mobile,otp]);
};
User.updateOtp = ({mobile,otp}) => {
    const query = "UPDATE "+userTbl+" SET otp = "+otp+" WHERE mobile = "+mobile;
    return sql.execute(query);
};
User.checkUser = ({mobile}) => {
    const query = "SELECT * FROM "+userTbl+" WHERE mobile = '"+mobile+"'";
    return sql.execute(query);
};
User.updateUser = ({username,email,password,mobile}) => {
    const query = "UPDATE "+userTbl+" SET username = '"+username+"',email = '"+email+"',password = '"+password+"' WHERE mobile = "+mobile;
    return sql.execute(query);
}; */
module.exports = AlertSubMaster;