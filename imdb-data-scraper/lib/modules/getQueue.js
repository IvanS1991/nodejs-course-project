const getQueue = () => {
  class Queue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    push(...values) {
      values.forEach((value) => {
        const item = {
          value,
          next: null,
        };

        if (this.tail === null) {
          this.head = this.tail = item;
        } else {
          this.tail.next = item;
          this.tail = item;
        }
      });

      this.length += values.length;

      return this;
    }

    pop() {
      if (this.head === null) {
        return this;
      }
      const value = this.head.value;
      this.head = this.head.next;
      this.length -= 1;
      return value;
    }

    peek() {
      if (this.head) {
        return this.head.value;
      }
      return null;
    }

    isEmpty() {
      return this.length === 0;
    }
  }

  return new Queue();
};

module.exports = getQueue;
