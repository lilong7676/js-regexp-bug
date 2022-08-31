// import testCode from './testCode.min.js';
// import testCode from './testCode';

// 复现方式 1
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const fakeWindow = iframe.contentWindow;

const code = `
    const r = /^(\\d{4})-(\\d{1,2})-(\\d{1,2})$/

    console.log(r.exec('2020-10-08'));
    console.log('RegExp.lastMatch', RegExp.lastMatch);
    console.log('RegExp.$1', RegExp.$1);
    return RegExp.$1;
`;

const evalScript = (code, fakeWindow) => {
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


const correctResult = evalScript(code, window);
console.log("correctResult", correctResult);


const wrongResult = evalScript(code, fakeWindow);
console.log("wrongResult", wrongResult);


// console.log('testcode   ------- begin');
// testCode()