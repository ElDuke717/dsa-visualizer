// src/data/implementations/graphImplementations.js

export const graphImplementations = {
    javascript: `
  class Graph {
    constructor() {
      this.adjacencyList = {};
    }
  
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) {
        this.adjacencyList[vertex] = [];
      }
    }
  
    addEdge(vertex1, vertex2) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
    }
  
    bfs(startVertex) {
      const visited = new Set();
      const queue = [startVertex];
      visited.add(startVertex);
      
      while (queue.length) {
        const vertex = queue.shift();
        console.log(vertex);
        
        for (let neighbor of this.adjacencyList[vertex]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
    }
  
    dfs(startVertex) {
      const visited = new Set();
      
      const dfsHelper = (vertex) => {
        visited.add(vertex);
        console.log(vertex);
        
        for (let neighbor of this.adjacencyList[vertex]) {
          if (!visited.has(neighbor)) {
            dfsHelper(neighbor);
          }
        }
      };
      
      dfsHelper(startVertex);
    }
  }`,
  
    python: `
  class Graph:
      def __init__(self):
          self.adjacency_list = {}
      
      def add_vertex(self, vertex):
          if vertex not in self.adjacency_list:
              self.adjacency_list[vertex] = []
              
      def add_edge(self, vertex1, vertex2):
          self.adjacency_list[vertex1].append(vertex2)
          self.adjacency_list[vertex2].append(vertex1)
      
      def bfs(self, start_vertex):
          visited = set()
          queue = [start_vertex]
          visited.add(start_vertex)
          
          while queue:
              vertex = queue.pop(0)
              print(vertex)
              
              for neighbor in self.adjacency_list[vertex]:
                  if neighbor not in visited:
                      visited.add(neighbor)
                      queue.append(neighbor)
                      
      def dfs(self, start_vertex):
          visited = set()
          
          def dfs_helper(vertex):
              visited.add(vertex)
              print(vertex)
              
              for neighbor in self.adjacency_list[vertex]:
                  if neighbor not in visited:
                      dfs_helper(neighbor)
                      
          dfs_helper(start_vertex)`
  };