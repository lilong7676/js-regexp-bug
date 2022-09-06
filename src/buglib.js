// 这里全局引入 core-js,排除了 core-js 的影响
import 'core-js/full';

export default function bug() {
  const r = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
  console.log('-----?bug?------');
  console.log(r.exec('2019-10-08'), RegExp.$1)
}
