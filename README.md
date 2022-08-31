Try reproduce a js RegExp bug.

Step :
```bash
$ npm i
$ npm run start
```

复现原因是因为 RegExp的执行上下文的 window 是 iframe中的 contentWindow，并不是全局的宿主 window，所以导致了 RegExp.$n 取值错误。应该和浏览器的 RegExp native 实现有关。

Reproducible 2:
```bash
$ git reset --hard 7974061c5f6e421e775c260dbc7178bc73d3db4f
$ npm i
$ npm run start
```

⚠️另外需要注意，在 eval、Function 构造函数中执行正则表达式时，需要转义反斜线，即:
```javascript
eval(`
const r = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
r.exec('2022-08-31'); // null
console.log(RegExp.$1) // ''
`)
```

在 eval 中需要写为:
```javascript
eval(`
const r = /^(\\d{4})-(\\d{1,2})-(\\d{1,2})$/
r.exec('2022-08-31');
console.log(RegExp.$1); // 2022
`)
```

