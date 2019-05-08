function num(n) {
  if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 1;
  } else {
    return num(n - 1) + num(n - 2);
  }
}

console.log(num(8));
