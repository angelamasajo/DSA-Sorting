// ============================== BUBBLE SORT =====================================
// how NOT to do it
// O(n) - best case scenario - check each pair one time
// O(n^2) - avg and worst case - each value needs swapping w/ each other value

function swap(array, i, j) {
  // this function swaps values at two indexes in the array
  const tmp = array[i]
  array[i] = array[j]
  array[j] = tmp
}

function bubbleSort(array) {
  let swaps = 0
  for (let i = 0; i < array.length - 1; i++) {
    // looks through adjacent pairs of values in array
    // if values in wrong order, it swaps them around & increases the swaps counter
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1)
      swaps++
    }
  }
  // if number of swaps greater than 0, then list def isn't in correct order yet
  // call bubbleSort again to keep sorting - recursive?
  if (swaps > 0) {
    return bubbleSort(array)
  }
  return array
}


// =============================== MERGE SORT =====================================

// takes divide and conquer approach to sorting
// breaks array down to continually smaller chunks, then merges them back in order
// O(log(n)) - best, avg, and worst case
function mergeSort(array) {
  // if array has 1 or 0 elements, then it is already sorted, return array
  if (array.length <= 1) {
    return array
  }
  // slice array into 2 halves and sort each have by recursively calling mergeSort
  const middle = Math.floor(array.length / 2)
  let left = array.slice(0, middle)
  let right = array.slice(middle, array.length)

  left = mergeSort(left)
  right = mergeSort(right)
  return mergeSort(left, right, array)
}

// the 2 sorted halves are merged together in the correct order using merge
function merge(left, right, array) {
  let leftIndex = 0
  let rightIndex = 0
  let outputIndex = 0

  // keep choosing lowest value from left or right arrays that haven't already
  // been added to the output array
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++]
    }
    else {
      array[outputIndex++] = right[rightIndex++]
    }
  }


  // when 1 of the arrays is empty, you ad all the remaining values 
  // from other array to it
  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i]
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i]
  }
  return array
}


// =============================== QUICK SORT =====================================

// O(log(n)) - best and avg case - 
// O(n^2) - worst case
// although more commonly used than merge sort bc it's more cache-efficient and
// can easily be performed in place (w/o addtl memory allocations)
// uses divide and conquer approach too
// partition array into 2 halves around pivot value
function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array
  }
  // recursively sort the 2 halves of the array util halves are length of 0 or 1
  const middle = partition(array, start, end)
  array = quickSort(array, start, middle)
  array = quickSort(array, middle + 1, end)
  return array
}

// LOMUTO'S ALGORITHM - partitioning algorithm

function partition(array, start, end) {
  // pivot is the final value in array
  const pivot = array[end - 1]
  let j = start
  // loop through array, swapping values as you go to put them 
  // on either side of pivot point
  for (let i = start; i < end - 1; i++) {
    // put the pivot into the correct place in array
    if (array[i] <= pivot) {
      swap(array, i, j)
      j++
    }
  }
  swap(array, end - 1, j)
  return j
}