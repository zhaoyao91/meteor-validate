var validator = Npm.require('validator');

var funcList = [
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

for (var i in funcList) {
    var prefix = 'str';
    var funcName = funcList[i];
    validate.extend(prefix + capitalizeFirstLetter(funcName), validator[funcName]);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}