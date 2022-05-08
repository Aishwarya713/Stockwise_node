const sql = require("../config/db.js");

const userTbl = "alerts";
const Alerts = function (alerts) {
    this.alert_type_id = alerts.alert_type_id;
	this.alert_type_sub_id = alerts.alert_type_sub_id;
    this.preference_data = alerts.preference_data;
    this.remarks = alerts.remarks;
};
Alerts.insertAlert = ({alert_type_id,alert_type_sub_id,preference_data,remarks}) => {
    return sql.execute("INSERT INTO "+userTbl+" (alert_type_id,alert_type_sub_id,preference_data,remarks) VALUES (?,?,?,?)",[alert_type_id,alert_type_sub_id,preference_data,remarks]);
};
/*Alerts.getSubAlertType = (alertTypeId) => {
    const query = "SELECT * FROM "+userTbl+" WHERE alert_type_id = '"+alertTypeId+"'";
	return sql.execute(query);
};
User.insertUser = ({username,mobile,otp,email,password}) => {
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
module.exports = Alerts;