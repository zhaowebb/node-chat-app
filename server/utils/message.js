var generateMessage = (mfrom, text) => {
	return {
		from : mfrom,
		text : text,
		createdAt: new Date().getTime()
	};
};

module.exports = {generateMessage};