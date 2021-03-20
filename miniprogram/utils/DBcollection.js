let db = wx.cloud.database();

// mail-邮件表-用于存储店主处理完的申请
export const mailDB = db.collection("mail");
// mailBox-收件箱表-用暂存储用户提交的加入申请
export const mailBoxDB = db.collection("mailBox");
// admin-管理员表-用存储管理员信息
export const adminDB = db.collection("admin");
// offDay-休息日表-用于存储休息的日期
export const offDayDB = db.collection("offDay");
// seriesDB-套系信息表-用于套系信息
export const seriesDB = db.collection("series");
