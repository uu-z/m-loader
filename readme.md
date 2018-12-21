## a loader plugin for menhera

### Install

```bash
$ yarn add @koishi/m-loader
```

### Usage

```js
const Mhr = require("menhera").default;
const loader = require("m-loader");

Mhr.use(loader).use({
  load: {
    dir: `${__dirname}/modules`
  }
});
```
