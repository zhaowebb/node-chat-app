var generateMessage = (mfrom, text) => {
	return {
		mfrom,
		text,
		createdAt: new Date().getTime()
	};
};

module.exports = {generateMessage};