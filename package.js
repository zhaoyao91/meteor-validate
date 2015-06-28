Package.describe({
    name: 'zhaoyao91:validate',
    version: '2.2.0',
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
    api.addFiles('built-in-validators/basic.js');
    api.addFiles('built-in-validators/as-string.js');
    api.addFiles('built-in-validators/as-string-server.js', 'server');

    api.export('validate');
});