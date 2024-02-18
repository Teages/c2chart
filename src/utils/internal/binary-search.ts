/**
 * Binary search
 * @param arr - The array to search
 * @param target - The target to search
 * @returns The index of the smallest number in array which bigger than the target
 */
export function binarySearch(
  arr: number[],
  target: number,
): number {
  let left = 0
  let right = arr.length - 1
  let mid: number

  while (left < right) {
    mid = Math.floor((left + right) / 2)
    if (arr[mid] <= target && (mid === arr.length - 1 || arr[mid + 1] > target)) {
      return mid
    }
    else if (arr[mid] <= target) {
      left = mid + 1
    }
    else {
      right = mid
    }
  }

  return left
}
