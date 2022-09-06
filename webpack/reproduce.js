const fs = require("fs");
const path = require("path");

const rootPath = path.resolve(__dirname, "..");
const srcPath = path.resolve(rootPath, "src");

fs.readFile(
  path.resolve(srcPath, "buglibDist/buglib.min.js"),
  function (error, data) {
    if (error) {
      console.log("read buglib.min.js error");
    } else {
      const buglibCode = data.toString();

      fs.readFile(
        path.resolve(srcPath, "bug-template.js"),
        function (error, data) {
          if (error) {
            console.log("read bug-template error");
          } else {
            const bugTemplate = data.toString();
            // 使用 JSON.stringify 解决 code 的转义问题
            // see https://stackoverflow.com/a/59097085
            const codeToInsert = `const buglibCode = ${JSON.stringify(buglibCode)};\n ${bugTemplate}`;

            // 将数据写入文件 index.js
            fs.writeFile(
              path.resolve(srcPath, "index.js"),
              codeToInsert,
              // 写入文件后调用的回调函数
              function (err) {
                if (err) throw err;
                // 如果没有错误
                console.log("write to index.js");
              }
            );
          }
        }
      );
    }
  }
);
