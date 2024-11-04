// src/data/implementations/linkedListImplementations.js
export const singlyLinkedListImplementations = {
    javascript: `
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class SinglyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    append(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.length++;
      return this;
    }
  
    prepend(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }
      this.length++;
      return this;
    }
  
    delete(value) {
      if (!this.head) return null;
      
      if (this.head.value === value) {
        this.head = this.head.next;
        this.length--;
        return true;
      }
  
      let current = this.head;
      while (current.next) {
        if (current.next.value === value) {
          current.next = current.next.next;
          this.length--;
          return true;
        }
        current = current.next;
      }
      return false;
    }
  }`,
  
    python: `
  class Node:
      def __init__(self, value):
          self.value = value
          self.next = None
  
  class SinglyLinkedList:
      def __init__(self):
          self.head = None
          self.tail = None
          self.length = 0
      
      def append(self, value):
          new_node = Node(value)
          if not self.head:
              self.head = new_node
              self.tail = new_node
          else:
              self.tail.next = new_node
              self.tail = new_node
          self.length += 1
          return self
      
      def prepend(self, value):
          new_node = Node(value)
          if not self.head:
              self.head = new_node
              self.tail = new_node
          else:
              new_node.next = self.head
              self.head = new_node
          self.length += 1
          return self
      
      def delete(self, value):
          if not self.head:
              return None
          
          if self.head.value == value:
              self.head = self.head.next
              self.length -= 1
              return True
          
          current = self.head
          while current.next:
              if current.next.value == value:
                  current.next = current.next.next
                  self.length -= 1
                  return True
              current = current.next
          return False`
  };
  
  export const doublyLinkedListImplementations = {
    javascript: `
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
  }
  
  class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    append(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.length++;
      return this;
    }
  
    prepend(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
      this.length++;
      return this;
    }
  
    delete(value) {
      if (!this.head) return null;
  
      let current = this.head;
      while (current) {
        if (current.value === value) {
          if (current === this.head) {
            this.head = current.next;
            if (this.head) this.head.prev = null;
          } else if (current === this.tail) {
            this.tail = current.prev;
            this.tail.next = null;
          } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
          }
          this.length--;
          return true;
        }
        current = current.next;
      }
      return false;
    }
  }`,
  
    python: `
  class Node:
      def __init__(self, value):
          self.value = value
          self.next = None
          self.prev = None
  
  class DoublyLinkedList:
      def __init__(self):
          self.head = None
          self.tail = None
          self.length = 0
      
      def append(self, value):
          new_node = Node(value)
          if not self.head:
              self.head = new_node
              self.tail = new_node
          else:
              new_node.prev = self.tail
              self.tail.next = new_node
              self.tail = new_node
          self.length += 1
          return self
      
      def prepend(self, value):
          new_node = Node(value)
          if not self.head:
              self.head = new_node
              self.tail = new_node
          else:
              new_node.next = self.head
              self.head.prev = new_node
              self.head = new_node
          self.length += 1
          return self
      
      def delete(self, value):
          if not self.head:
              return None
          
          current = self.head
          while current:
              if current.value == value:
                  if current == self.head:
                      self.head = current.next
                      if self.head:
                          self.head.prev = None
                  elif current == self.tail:
                      self.tail = current.prev
                      self.tail.next = None
                  else:
                      current.prev.next = current.next
                      current.next.prev = current.prev
                  self.length -= 1
                  return True
              current = current.next
          return False`
  };