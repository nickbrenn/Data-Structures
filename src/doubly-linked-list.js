class ListNode {
  /* Do not modify the constructor */
  constructor(value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }

  /* Insert the given value as this node's
  `next` node */
  insertAfter(value) {
    this.next = value;
    this.next.prev = this;
  }

  /* Insert the given value as the this node's
  `prev` node */
  insertBefore(value) {
    this.prev = value;
    this.prev.next = this;
  }

  /* Delete this node */
  delete() {
    if (this.next) {
      this.next.prev = this.prev;
    }
    if (this.prev) {
      this.prev.next = this.next;
    }
  }
}

class DoublyLinkedList {
  /* Do not modify the constructor */
  constructor() {
    this.head = null;
    this.tail = null;
  }

  /* Adds the given value as the new head
  node of the list */
  addToHead(value) {
    const newNode = new ListNode(value, null, this.head);
    if (!this.tail && this.head) {
      this.tail = this.head;
    }
    if (this.head) {
      newNode.insertAfter(this.head);
    }
    this.head = newNode;
  }

  /* Remove the list's current head. The list's
  `head` pointer should point to the removed node's
  `next` node */
  removeFromHead() {
    if (this.head) {
      const result = this.head.value;
      this.head.delete();
      this.head = this.head.next;
      return result;
    } else return null;
  }

  /* Adds the given value as the new tail
  node of the list */
  addToTail(value) {
    const newNode = new ListNode(value, this.tail, null);
    if (!this.head && !this.tail) {
      this.head = newNode;
      return;
    }
    if (this.tail) {
      newNode.insertBefore(this.tail);
    }
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
    if (!this.head.next && !this.tail.prev) {
      this.tail.prev = this.head;
      this.head.next = this.tail;
    }
  }

  /* Remove the list's current tail. The list's
  `tail` pointer should point to the removed node's
  `prev` node */
  removeFromTail() {
    if (this.tail) {
      const result = this.tail.value;
      this.tail.delete();
      this.tail = this.tail.prev;
      if (this.tail === this.head) {
        this.tail = null;
      }
      return result;
    } else if (this.head) {
      const result = this.head.value;
      this.head.delete();
      this.head = null;
      return result;
    } else return null;
  }

  /* Move the given node to the front of the
  list. Update the list's `head` pointer
  accordingly */
  moveToFront(node) {
    if (node === this.head || !node) {
      return;
    }
    const replaceHead = {
      value: node.value,
      prev: null,
      next: this.head
    };
    if (node.next) {
      node.next.prev = node.next.prev.prev;
    }
    if (node.prev) {
      node.prev.next = node.prev.next.next;
    }
    this.head.prev = replaceHead;
    this.head = replaceHead;
    if (node === this.tail) {
      this.tail = this.tail.prev;
    }
  }

  /* Move the given node to the back of the
  list. Update the list's `tail` pointer 
  accordingly */
  moveToBack(node) {
    if (node === this.tail || !node) {
      return;
    }
    if (node === this.head && !this.tail) {
      return;
    }
    const replaceTail = {
      value: node.value,
      prev: this.tail,
      next: null
    };
    if (node.next) {
      node.next.prev = node.next.prev.prev;
    }
    if (node.prev) {
      node.prev.next = node.prev.next.next;
    }
    this.tail.next = replaceTail;
    this.tail = replaceTail;
    if (node === this.head) {
      this.head = this.head.next;
    }
  }

  /* Delete the given node from the list */
  delete(node) {
    if (!node) return;
    if (node === this.head && this.tail === null) {
      this.head = null;
    } else if (node === this.head && !this.head.next.next) {
      this.head = this.tail;
      this.head.prev = null;
      this.tail = null;
    } else if (node === this.tail && this.tail.prev === this.head) {
      this.tail = null;
      this.head.next = null;
    } else if (node !== this.tail && node !== this.head) {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    } else if (node === this.tail) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else if (node === this.tail && this.head.next === this.tail) {
      this.tail = null;
    } else if (node === this.tail && this.tail.prev === this.head) {
      this.tail = null;
      this.head.next = null;
    } else if (node === this.head) {
      node.next.prev = null;
      this.head = node.next;
    }
  }
}

module.exports = DoublyLinkedList;
