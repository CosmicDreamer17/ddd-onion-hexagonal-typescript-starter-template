/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'domain-no-external',
      comment: 'Domain layer must not import from any other layer',
      severity: 'error',
      from: { path: '^packages/domain' },
      to: { path: '^(packages/application|packages/infra|apps/api|apps/web)' }
    },
    {
      name: 'application-no-infra-or-api',
      comment: 'Application layer must not import from Infrastructure or API layers',
      severity: 'error',
      from: { path: '^packages/application' },
      to: { path: '^(packages/infra|apps/api|apps/web)' }
    },
    {
      name: 'infra-no-api',
      comment: 'Infrastructure layer must not import from API or Web layers',
      severity: 'error',
      from: { path: '^packages/infra' },
      to: { path: '^(apps/api|apps/web)' }
    }
  ],
  options: {
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
    doNotFollow: {
      dependencyTypes: [
        'npm',
        'npm-dev',
        'npm-optional',
        'npm-peer',
        'npm-bundled',
        'npm-no-pkg'
      ]
    }
  }
};
