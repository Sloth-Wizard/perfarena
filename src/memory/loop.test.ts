function createArr(count: number): Array<number> {
    return new Array(count).fill(0).map((_, i) => i);
}

function forLoop(arr: Array<number>): number {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function reduce(arr: Array<number>): number {
    return arr.reduce((acc, x) => acc + x, 0);
}

function time(count: number, arr: Array<number>, fn: (arr: Array<number>) => number) {
    const start = performance.now();

    for (let i = 0; i < count; i++) {
        fn(arr);
    }
    return performance.now() - start;
}

const S = createArr(10);
const M = createArr(100);
const L = createArr(1000);
const XL = createArr(10000);
const GNNNNN = createArr(1_000_000);

const runs = [1, 10, 100, 1000];

let results = {
    S:      {reduce: [] as Array<number>, forLoop: [] as Array<number>},
    M:      {reduce: [] as Array<number>, forLoop: [] as Array<number>},
    L:      {reduce: [] as Array<number>, forLoop: [] as Array<number>},
    XL:     {reduce: [] as Array<number>, forLoop: [] as Array<number>},
    GNNNNN: {reduce: [] as Array<number>, forLoop: [] as Array<number>},
}

// warm up
time(100, S, reduce);
time(100, S, forLoop);

for (let i = 0; i < runs.length; i++) {
    console.log("TEST RUN: ", runs[i]);
    
    const run = runs[i];

    // Run it all
    results.S.reduce.push(time(run, S, reduce));
    results.S.forLoop.push(time(run, S, forLoop));
    results.M.reduce.push(time(run, M, reduce));
    results.M.forLoop.push(time(run, M, forLoop));
    results.L.reduce.push(time(run, L, reduce));
    results.L.forLoop.push(time(run, L, forLoop));
    results.XL.reduce.push(time(run, XL, reduce));
    results.XL.forLoop.push(time(run, XL, forLoop));
    results.GNNNNN.reduce.push(time(run, GNNNNN, reduce));
    results.GNNNNN.forLoop.push(time(run, GNNNNN, forLoop));
}

console.log("RESULTS: ", results);
