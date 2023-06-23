export default function (array: number[]) {
  let sum = 0;
  let index = 0;
  for (const [ind, val] of array.entries()) {
    sum += val;
    if (sum >= calculateArraySumFromIndex(array, ind)) {
      index = ind;
      break;
    }
  }

  return {
    splitIndex: index,
    dividedArrays: [array.slice(0, index), array.slice(index, array.length)],
  };
}

function calculateArraySumFromIndex(array: number[], start: number) {
  return array
    .slice(start, array.length)
    .reduce((pv, curr) => parseFloat((pv + curr).toFixed(3)), 0.0);
}
