module.exports = (accumulator, currentValue) => {
	accumulator[currentValue.key] = currentValue.value;
	return accumulator
};
