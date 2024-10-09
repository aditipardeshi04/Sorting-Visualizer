document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('array-container');
    const generateArrayBtn = document.getElementById('generate-array');
    const bubbleSortBtn = document.getElementById('bubble-sort');
    const insertionSortBtn = document.getElementById('insertion-sort');
    const selectionSortBtn = document.getElementById('selection-sort');
    const quickSortBtn = document.getElementById('quick-sort');
    const mergeSortBtn = document.getElementById('merge-sort');

    let array = [];

    // Generate a new array
    generateArrayBtn.addEventListener('click', generateNewArray);

    // Sorting buttons
    bubbleSortBtn.addEventListener('click', bubbleSort);
    insertionSortBtn.addEventListener('click', insertionSort);
    selectionSortBtn.addEventListener('click', selectionSort);
    quickSortBtn.addEventListener('click', quickSort);
    mergeSortBtn.addEventListener('click', mergeSort);

    function generateNewArray() {
        arrayContainer.innerHTML = '';
        array = [];
        for (let i = 0; i < 50; i++) {
            array.push(Math.floor(Math.random() * 500) + 10);
        }
        displayArray(array);
    }

    function displayArray(array) {
        arrayContainer.innerHTML = '';
        array.forEach(value => {
            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.height = `${value}px`;
            bar.style.width = '20px';
            arrayContainer.appendChild(bar);
        });
    }

    async function bubbleSort() {
        let bars = document.querySelectorAll('.bar');
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                bars[j].style.backgroundColor = 'red';
                bars[j + 1].style.backgroundColor = 'red';
                await sleep(50);

                if (array[j] > array[j + 1]) {
                    // Swap elements
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    // Swap bars
                    bars[j].style.height = `${array[j]}px`;
                    bars[j + 1].style.height = `${array[j + 1]}px`;
                }
                bars[j].style.backgroundColor = 'teal';
                bars[j + 1].style.backgroundColor = 'teal';
            }
        }
    }

    async function insertionSort() {
        let bars = document.querySelectorAll('.bar');
        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let j = i - 1;
            bars[i].style.backgroundColor = 'red';
            await sleep(50);

            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                bars[j + 1].style.height = `${array[j + 1]}px`;
                bars[j].style.backgroundColor = 'red';
                await sleep(50);
                bars[j].style.backgroundColor = 'teal';
                j = j - 1;
            }
            array[j + 1] = key;
            bars[j + 1].style.height = `${key}px`;
            bars[i].style.backgroundColor = 'teal';
        }
    }

    async function selectionSort() {
        let bars = document.querySelectorAll('.bar');
        for (let i = 0; i < array.length - 1; i++) {
            let minIndex = i;
            bars[minIndex].style.backgroundColor = 'red';
            for (let j = i + 1; j < array.length; j++) {
                bars[j].style.backgroundColor = 'red';
                await sleep(50);

                if (array[j] < array[minIndex]) {
                    bars[minIndex].style.backgroundColor = 'teal';
                    minIndex = j;
                    bars[minIndex].style.backgroundColor = 'red';
                } else {
                    bars[j].style.backgroundColor = 'teal';
                }
            }

            // Swap elements
            if (minIndex !== i) {
                let temp = array[i];
                array[i] = array[minIndex];
                array[minIndex] = temp;
                // Swap bars
                bars[i].style.height = `${array[i]}px`;
                bars[minIndex].style.height = `${array[minIndex]}px`;
            }
            bars[minIndex].style.backgroundColor = 'teal';
        }
    }

    async function quickSort() {
        await quickSortHelper(array, 0, array.length - 1);
        displayArray(array);
    }

    async function quickSortHelper(array, low, high) {
        if (low < high) {
            let pi = await partition(array, low, high);
            await quickSortHelper(array, low, pi - 1);
            await quickSortHelper(array, pi + 1, high);
        }
    }

    async function partition(array, low, high) {
        let pivot = array[high];
        let i = (low - 1);
        let bars = document.querySelectorAll('.bar');
        bars[high].style.backgroundColor = 'orange';

        for (let j = low; j <= high - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            await sleep(50);
            if (array[j] < pivot) {
                i++;
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;

                bars[i].style.height = `${array[i]}px`;
                bars[j].style.height = `${array[j]}px`;
                bars[i].style.backgroundColor = 'teal';
            } else {
                bars[j].style.backgroundColor = 'teal';
            }
        }
        let temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;

        bars[i + 1].style.height = `${array[i + 1]}px`;
        bars[high].style.height = `${array[high]}px`;
        bars[high].style.backgroundColor = 'teal';

        return (i + 1);
    }

    async function mergeSort() {
        await mergeSortHelper(array, 0, array.length - 1);
        displayArray(array);
    }

    async function mergeSortHelper(array, l, r) {
        if (l >= r) {
            return;
        }
        let m = l + Math.floor((r - l) / 2);
        await mergeSortHelper(array, l, m);
        await mergeSortHelper(array, m + 1, r);
        await merge(array, l, m, r);
    }

    async function merge(array, l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;

        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) {
            L[i] = array[l + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = array[m + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = l;

        let bars = document.querySelectorAll('.bar');

        while (i < n1 && j < n2) {
            bars[l + i].style.backgroundColor = 'red';
            bars[m + 1 + j].style.backgroundColor = 'red';
            await sleep(50);
            if (L[i] <= R[j]) {
                array[k] = L[i];
                bars[k].style.height = `${array[k]}px`;
                bars[k].style.backgroundColor = 'teal';
                i++;
            } else {
                array[k] = R[j];
                bars[k].style.height = `${array[k]}px`;
                bars[k].style.backgroundColor = 'teal';
                j++;
            }
            k++;
        }

        while (i < n1) {
            array[k] = L[i];
            bars[k].style.height = `${array[k]}px`;
            bars[k].style.backgroundColor = 'teal';
            i++;
            k++;
        }

        while (j < n2) {
            array[k] = R[j];
            bars[k].style.height = `${array[k]}px`;
            bars[k].style.backgroundColor = 'teal';
            j++;
            k++;
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateNewArray();
});
