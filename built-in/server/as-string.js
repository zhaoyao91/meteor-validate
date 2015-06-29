var validator = Npm.require('validator');

var validations = [
    'contains',
    'equals',
    'isAfter',
    'isAlpha',
    'isAlphanumeric',
    'isAscii',
    'isBase64',
    'isBefore',
    'isBoolean',
    'isByteLength',
    'isCreditCard',
    'isCurrency',
    'isDate',
    'isDivisibleBy',
    'isEmail',
    'isFQDN',
    'isFloat',
    'isFullWidth',
    'isHalfWidth',
    'isHexColor',
    'isHexadecimal',
    'isIP',
    'isISBN',
    'isISIN',
    'isIn',
    'isInt',
    'isJSON',
    'isLength',
    'isLowercase',
    'isMobilePhone',
    'isMongoId',
    'isMultibyte',
    'isNull',
    'isNumeric',
    'isSurrogatePair',
    'isURL',
    'isUUID',
    'isUppercase',
    'isVariableWidth',
    'matches'
];

for (var i in validations) {
    var name = validations[i];
    validate.addValidation('asString', name, validator[name]);
}