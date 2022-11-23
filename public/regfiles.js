let regcache = {};

function loadRegs(regUrl) {
  return new Promise(function (resolve, reject) {
    loadRegFile(regUrl)
      .then(function () {
        resolve(parseRegCache(regcache['wr']));
      })
      .catch(reject);
  });
}

function parseRegCache(reg) {
  if (Array.isArray(reg.children)) {
    return reg.children.flatMap(child => parseRegCache({ ...reg, children: null, ...child, notes: [...(reg.notes || []), ...(child.notes || [])] }));
  } else {
    return reg;
  }
}

function loadRegFile(regUrl) {
  return new Promise(function (resolve, reject) {
    if (undefined === regcache[regUrl]) {
      $.getJSON(`/regs/${regUrl}.json`, function (data) {
        const load = (Array.isArray(data.load)) ? data.load : [];
        if ("string" === typeof data.parent) {
          load.push(data.parent);
        } else if (regUrl !== "wr") {
          data.parent = "wr";
          load.push(data.parent);
        }
        regcache[regUrl] = data;
        Promise.all(load.map(i => loadRegFile(i)))
          .then(i => {
            if (undefined !== data.parent) {
              if (Array.isArray(regcache[data.parent].children)) {
                regcache[data.parent].children.push(data);
              } else {
                regcache[data.parent].children = [data];
              }
            }
            resolve();
          });
      })
        .fail(() => {
          console.error(`Could not retrieve reg file ${regUrl}`);
          reject()
        });
    } else {
      resolve();
    }
  })
}

