export default function splitArray(arr: number[]) {
  // Sort the array in descending order
  arr.sort((a, b) => b - a);

  // Initialize two variables to store the sums of each pair
  let sum1 = 0,
    sum2 = 0;

  let i = 0;
  let j = 0;

  // Loop through the array and add the largest integers to the first pair
  // until the sum of the first pair is greater than or equal to half of the total sum
  for (i = 0; i < arr.length; i++) {
    sum1 += arr[i];
    if (sum1 >= arr.reduce((a, b) => a + b) / 2) {
      break;
    }
  }

  // The remaining integers will be added to the second pair
  for (j = i; j >= 0; j--) {
    if (arr[j] <= arr[j - 1]) {
      sum2 += arr[j];
    } else {
      break;
    }
  }

  // Return the two pairs as arrays
  return [arr.slice(0, i), arr.slice(j)];
}
