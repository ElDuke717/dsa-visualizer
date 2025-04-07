// src/data/implementations/stackImplementations.js

export const stackImplementations = {
  javascript: `// Stack implementation using Array
class Stack {
  constructor() {
    this.items = [];
  }
  
  // Push element to the top of the stack
  push(element) {
    this.items.push(element);
    return element;
  }
  
  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      return "Underflow"; // Stack is empty
    }
    return this.items.pop();
  }
  
  // Return the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }
  
  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Return the size of the stack
  size() {
    return this.items.length;
  }
  
  // Clear the stack
  clear() {
    this.items = [];
  }
  
  // Print the stack
  print() {
    let str = "";
    for (let i = this.items.length - 1; i >= 0; i--) {
      str += this.items[i] + " ";
    }
    return str.trim();
  }
}

// Example usage:
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Stack: " + stack.print()); // Stack: 30 20 10
console.log("Top element: " + stack.peek()); // Top element: 30
console.log("Popped: " + stack.pop()); // Popped: 30
console.log("Stack after pop: " + stack.print()); // Stack: 20 10
console.log("Size: " + stack.size()); // Size: 2
console.log("Is empty: " + stack.isEmpty()); // Is empty: false
stack.clear();
console.log("After clear, is empty: " + stack.isEmpty()); // After clear, is empty: true`,

  python: `# Stack implementation using List
class Stack:
    def __init__(self):
        self.items = []
    
    # Push element to the top of the stack
    def push(self, item):
        self.items.append(item)
        return item
    
    # Remove and return the top element
    def pop(self):
        if self.is_empty():
            return "Underflow"  # Stack is empty
        return self.items.pop()
    
    # Return the top element without removing it
    def peek(self):
        if self.is_empty():
            return "Stack is empty"
        return self.items[-1]
    
    # Check if stack is empty
    def is_empty(self):
        return len(self.items) == 0
    
    # Return the size of the stack
    def size(self):
        return len(self.items)
    
    # Clear the stack
    def clear(self):
        self.items = []
    
    # Print the stack
    def print_stack(self):
        if self.is_empty():
            return "Stack is empty"
        return ' '.join(str(item) for item in reversed(self.items))

# Example usage:
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
print(f"Stack: {stack.print_stack()}")  # Stack: 30 20 10
print(f"Top element: {stack.peek()}")  # Top element: 30
print(f"Popped: {stack.pop()}")  # Popped: 30
print(f"Stack after pop: {stack.print_stack()}")  # Stack: 20 10
print(f"Size: {stack.size()}")  # Size: 2
print(f"Is empty: {stack.is_empty()}")  # Is empty: False
stack.clear()
print(f"After clear, is empty: {stack.is_empty()}")  # After clear, is empty: True`
};
