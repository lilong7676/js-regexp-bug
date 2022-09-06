

const iframe = document.createElement("iframe");
iframe.setAttribute('src', 'about:blank');
document.body.appendChild(iframe);
const fakeWindow = iframe.contentWindow;

const fakeWindowProxyToFixRegExpBug = new Proxy(fakeWindow, {
  get(target, p, receiver) {

    // to reproduce bug
    return target[p];

    // to fix RegExp.$n bug
    if (p === "RegExp") {
      return RegExp;
    }
    return target[p];
  },
});

const evalScriptSandbox = (code, fakeWindow) => {
  const resolver = new Function(`
  return function(window) {
    with(window) {
      try {
        return (function() {
          "use strict";
          ${code};
          window.buglib();
        })();
      } catch(e) {
        console.log(e);
      }
    }
  }
`);

  return resolver().call(fakeWindow, fakeWindow);
};

// evalScriptSandbox(buglibCode, fakeWindow);
// evalScriptSandbox(buglibCode, window);
evalScriptSandbox(buglibCode, fakeWindowProxyToFixRegExpBug);
