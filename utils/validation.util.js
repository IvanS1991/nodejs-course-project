const validation = () => {
    const isInvalidStr = (str, min, max, pattern) => {
        const invalidType = typeof str !== 'string';
        const tooShort = min ? str.length < min : false;
        const tooLong = max ? str.length > max : false;
        const notMatchingPattern = pattern ? str.search(pattern) >= 0 : false;

        return invalidType ||
            tooShort ||
            tooLong ||
            notMatchingPattern;
    };

    class Validator {
        isInvalidUsername(str) {
            return isInvalidStr(str, 2, 20);
        }

        isInvalidPassword(str) {
            const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]$/;

            return isInvalidStr(str, 6, 40, pattern);
        }

        isInvalidCollectionName(str) {
            return isInvalidStr(str, 1, 40);
        }

        isInvalidCommentContent(str) {
            return isInvalidStr(str, 1, 200);
        }
    }

    return new Validator();
};

module.exports = validation;
