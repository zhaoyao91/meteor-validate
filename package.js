Package.describe({
    name: 'zhaoyao91:validate',
    version: '3.0.0',
    summary: 'Validate arguments of methods in an easy way.',
    git: 'https://github.com/zhaoyao91/meteor-validate',
    documentation: 'README.md'
});

Npm.depends({
    validator: '3.40.1'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');

    api.use('check');

    api.addFiles('lib/validation.js');
    api.addFiles('lib/validator.js');
    api.addFiles('lib/validators.js');
    api.addFiles('lib/validate.js');

    api.addFiles('built-in/basic.js');
    api.addFiles('built-in/as-string.js');
    api.addFiles('built-in/server/as-string.js', 'server');

    api.export('validate');
});

Package.onTest(function(api) {
    api.use('sanjo:jasmine@0.14.0');
    api.use('zhaoyao91:validate');

    api.addFiles('tests/error-msg.js');
    api.addFiles('tests/common/basic-validator.js');
    api.addFiles('tests/common/basic-usage.js');
    api.addFiles('tests/common/extend-validator.js');
    api.addFiles('tests/server/as-string-validator.js', 'server');
});