const Mhr = require("menhera").default;
const loader = require("../../index");

Mhr.use(loader).use({
  $data: {
    $({ _key, _val }) {
      console.log(_key, _val);
    }
  },
  load: {
    dir: `${__dirname}/modules`
  }
});
