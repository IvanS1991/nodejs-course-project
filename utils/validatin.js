const validation = () => {
    const validateLength = (data, startLength, endLength) => {
        if (data.trim().length < startLength
            || data.trim().length > endLength) {
            return true;
        }
        return false;
    };

    return {
        validateLength,
    };
};

module.exports = validation;
