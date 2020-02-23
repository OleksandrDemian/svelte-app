# svelte3-app

Creates a starter svelte application template

### How to use

Basic usage: enter in the taget folder and type
```
npx svelte3-app
```

### Input
- `-n <project name>` name of the project (if empty, project will be created in the directory it called from)
- `-s <true|false|0|1>` initialize the prject with sapper framework
- `-b <rollup|webpack>` bundler to use (rollup is default)

### Examples

```
npx svelte3-app -n svelte-rollup
npx svelte3-app -n svelte-webpack -b webpack
npx svelte3-app -n sapper-rollup -s
npx svelte3-app -n sapper-webpack -b webpack -s
```

### Templates

- Svelte Rollup: https://github.com/sveltejs/template
- Svelte Webpack: https://github.com/sveltejs/template-webpack
- Sapper Rollup: https://github.com/sveltejs/sapper-template-rollup
- Sapper Webpack: https://github.com/sveltejs/sapper-template-webpack