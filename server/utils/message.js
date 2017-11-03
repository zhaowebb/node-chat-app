var generateMessage = (mfrom, text) => {
	return {
		from : mfrom,
		text : text,
		createdAt: new Date().getTime()
	};
};

var generateLocationMessage = (mfrom, latitude, longitude) => {
	return {from : mfrom,
	url: `https://www.google.com/maps?q=${latitude},${longitude}`,
	createdAt: new Date().getTime
	}
};
module.exports = {generateMessage, generateLocationMessage};