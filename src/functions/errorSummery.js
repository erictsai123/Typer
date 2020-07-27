export default function errorSummary(str) {
  let dir = {};
  for (let i = 0; i < str.length; i++) {
    let k = str[i];
    if (dir[k]) {
      dir[k] = dir[k] + 1;
    } else {
      dir[k] = 1;
    }
  }
  dir[" "] = 0;
  dir = Object.entries(dir);
  dir.sort((a, b) => b[1] - a[1]);
  return dir.map((x) => ({ x: x[0], y: x[1] }));
}
