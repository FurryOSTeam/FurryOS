const YiffyAPI = require("yiffy");

const Yiffy = new YiffyAPI({
  userAgent: process.env.userAgent,
	apiKey: process.env.yiffykey
});