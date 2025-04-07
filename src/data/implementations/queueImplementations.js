// src/data/implementations/queueImplementations.js

export const queueImplementations = {
  javascript: `// Queue implementation using Array
class Queue {
  constructor() {
    this.items = [];
  }
  
  // Add element to the rear of the queue
  enqueue(element) {
    this.items.push(element);
    return element;
  }
  
  // Remove and return the front element
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow"; // Queue is empty
    }
    return this.items.shift();
  }
  
  // Return the front element without removing it
  front() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }
  
  // Check if queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Return the size of the queue
  size() {
    return this.items.length;
  }
  
  // Clear the queue
  clear() {
    this.items = [];
  }
  
  // Print the queue
  print() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i] + " ";
    }
    return str.trim();
  }
}

// Example usage:
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log("Queue: " + queue.print()); // Queue: 10 20 30
console.log("Front element: " + queue.front()); // Front element: 10
console.log("Dequeued: " + queue.dequeue()); // Dequeued: 10
console.log("Queue after dequeue: " + queue.print()); // Queue: 20 30
console.log("Size: " + queue.size()); // Size: 2
console.log("Is empty: " + queue.isEmpty()); // Is empty: false
queue.clear();
console.log("After clear, is empty: " + queue.isEmpty()); // After clear, is empty: true`,

  python: `# Queue implementation using List
class Queue:
    def __init__(self):
        self.items = []
    
    # Add element to the rear of the queue
    def enqueue(self, item):
        self.items.append(item)
        return item
    
    # Remove and return the front element
    def dequeue(self):
        if self.is_empty():
            return "Underflow"  # Queue is empty
        return self.items.pop(0)
    
    # Return the front element without removing it
    def front(self):
        if self.is_empty():
            return "Queue is empty"
        return self.items[0]
    
    # Check if queue is empty
    def is_empty(self):
        return len(self.items) == 0
    
    # Return the size of the queue
    def size(self):
        return len(self.items)
    
    # Clear the queue
    def clear(self):
        self.items = []
    
    # Print the queue
    def print_queue(self):
        if self.is_empty():
            return "Queue is empty"
        return ' '.join(str(item) for item in self.items)

# Example usage:
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
print(f"Queue: {queue.print_queue()}")  # Queue: 10 20 30
print(f"Front element: {queue.front()}")  # Front element: 10
print(f"Dequeued: {queue.dequeue()}")  # Dequeued: 10
print(f"Queue after dequeue: {queue.print_queue()}")  # Queue: 20 30
print(f"Size: {queue.size()}")  # Size: 2
print(f"Is empty: {queue.is_empty()}")  # Is empty: False
queue.clear()
print(f"After clear, is empty: {queue.is_empty()}")  # After clear, is empty: True`
};
