import { Graph } from "./Graph.js";

const graph = new Graph();
graph.knightMoves([0,0],[1,2]);
console.log(graph.paths);
