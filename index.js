const Mhr = require("menhera").default;
const requireDir = require("require-dir");
const _ = require("lodash");
const path = require("path");

const loadDir = dir => {
  dir = Array.isArray(dir) ? dir : [dir];
  return dir.map(val => ({
    _run: _.values(
      requireDir(path.resolve(val), {
        noCache: true,
        filter(file) {
          const basename = path.basename(file, ".js");
          const load = _.get(Mhr, `metas.${basename}.load`, true);
          const depends = _.get(Mhr, `metas.${basename}.depends_on`, []);
          const depends_valid = depends.every(i => _.get(Mhr, `metas.${basename}.load`, false));
          return load && depends_valid;
        },
        mapValue(v, b) {
          if (v.load && v.load == false) {
            return {};
          }
          if (v.ignore) {
            v = _.omit(v, v.ignore);
          }
          if (typeof v.default == "function") {
            v.default = v.default();
          }

          return v.default || v;
        }
      })
    )
  }));
};

module.exports = {
  loadDir,
  $load: {
    dir({ _val: dir }) {
      Mhr.$use(loadDir(dir));
    }
  }
};
