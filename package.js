Package.describe({
    name: 'zhaoyao91:validate',
    version: '1.0.0',
    summary: 'Validate arguments of methods in an easy way.',
    git: '',
    documentation: 'README.md'
});

Npm.depends({
    validator: '3.40.1'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');

    api.use('check');

    api.addFiles('lib/validate.js');
    api.addFiles('lib/built-in.js');
    api.addFiles('lib/adapt-validator.js', 'server');

    api.export('validate');
});