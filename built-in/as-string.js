validate.addValidator('asString', {
    converter: function(arg) {
        if (arg === null || arg === undefined || arg !== arg) return '';
        else if (arg.toString) return arg.toString();
        else return arg + '';
    }
});
