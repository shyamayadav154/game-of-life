"use client";

import { useEffect, useState } from "react";

const genrateGrid = (n, m) => {
    return Array.from({ length: n }, () =>
        Array.from({ length: m }, () => Math.floor(Math.random() * 2)),
    );
};

const n = 40;
const m = 40;

const Matrix = () => {
    const [grid, setGrid] = useState(genrateGrid(n, m));
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        if (!isRunning) return;

        let o = setInterval(() => console.log("hello wolrl"), 50);
        let t = setInterval(() => updateGrid(setGrid), 50);

        return () => {
            clearInterval(o);
            clearInterval(t);
        };
    }, [isRunning]);

    return (
        <div className="flxe gap-5">
            <div className="flex gap-1 py-2">
                <button
                    className="border p-1"
                    onClick={() => setIsRunning((prevRun) => !prevRun)}
                >
                    Start/Stop
                </button>
                <button
                    className="border p-1"
                    onClick={() => setGrid(genrateGrid(n, m))}
                >
                    Random
                </button>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${n},minmax(0,1fr))`,
                    griTemplateRows: `repeat(${m},minmax(0,1fr))`,
                }}
                className="border"
            >
                {grid.map((row, i) =>
                    row.map((col, j) => (
                        <div
                            key={`${i}-${j}`}
                            className={`w-4 h-4 border ${col ? "bg-white" : ""}`}
                        />
                    )),
                )}
            </div>
        </div>
    );
};

export default Matrix;

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
];

function updateGrid(setGrid) {
    console.log("inside grid");
    const newGrid = (grid) =>
        grid.map((row, i) => {
            return row.map((col, j) => {
                const aliveNeighbourCount = operations.reduce((acc, [x, y]) => {
                    const newI = i + x;
                    const newJ = j + y;

                    if (
                        newI >= 0 &&
                        newI < grid.length &&
                        newJ >= 0 &&
                        newJ < row.length
                    ) {
                        acc += grid[newI][newJ]
                    }

                    return acc;
                }, 0);

                if (col === 1) {
                    if (aliveNeighbourCount < 2 || aliveNeighbourCount > 3) {
                        return 0;
                    } else {
                        return 1;
                    }
                }

                if (col === 0) {
                    if (aliveNeighbourCount === 3) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
        });

    setGrid(newGrid);
}
