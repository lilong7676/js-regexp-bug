// reproduce

const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const fakeWindow = iframe.contentWindow;

const fakeWindowProxyToFixRegExpBug = new Proxy(fakeWindow, {

  get(target, p, receiver) {
    if (p === 'RegExp') {
      // fix RegExp.$n bug
      return RegExp;
    }
    return Reflect.get(target, p, receiver);
  }
})

const code = `
    const r = /^(\\d{4})-(\\d{1,2})-(\\d{1,2})$/

    console.log(r.exec('2020-10-08'));
    console.log('RegExp.lastMatch', RegExp.lastMatch);
    console.log('RegExp.$1', RegExp.$1);
    return RegExp.$1;
`;

const evalScriptSandbox = (code, fakeWindow) => {
  const resolver = new Function(`
    return function(window) {
      with(window) {
        try {
          return (function() {
            "use strict";
            ${code}
          })();
        } catch(e) {
          console.log(e);
        }
      }
    }
  `);

  return resolver().call(fakeWindow, fakeWindow);
};


const correctResult = evalScriptSandbox(code, window);
console.log("correctResult", correctResult);

const correctResult2 = evalScriptSandbox(code, fakeWindowProxyToFixRegExpBug);
console.log("correctResult2", correctResult);

const wrongResult = evalScriptSandbox(code, fakeWindow);
console.log("wrongResult", wrongResult);