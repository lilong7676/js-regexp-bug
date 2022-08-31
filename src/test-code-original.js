export default function test() {
  const r = /^(\\d{4})-(\\d{1,2})-(\\d{1,2})$/;
  console.log(r.exec("2020-10-08"));
  console.log("RegExp.lastMatch", RegExp.lastMatch);
  console.log("RegExp.$1", RegExp.$1);
  return RegExp.$1;
}
