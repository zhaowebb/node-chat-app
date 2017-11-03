var moment = require('moment');

var generateMessage = (mfrom, text) => {
	return {
		from : mfrom,
		text : text,
		createdAt: moment.valueOf()
	};
};

var generateLocationMessage = (mfrom, latitude, longitude) => {
	return {from : mfrom,
	url: `https://www.google.com/maps?q=${latitude},${longitude}`,
	createdAt: moment.valueOf()
	}
};
module.exports = {generateMessage, generateLocationMessage};