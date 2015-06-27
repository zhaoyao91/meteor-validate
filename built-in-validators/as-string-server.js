var validator = Npm.require('validator');

var validationsList = [
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

var validationsMap = {};

for (var i in validationsList) {
    var name = validationsList[i];
    validationsMap[name] = validator[name];
}

validate.extendValidator('asString', validationsMap);
