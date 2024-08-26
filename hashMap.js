class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.loadFactor = 0.8;
    this.capacity = this.buckets.length;
    this.numOfInserts = 0;
  }

  hash(key) {
    let hashKey = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashKey += key.charCodeAt(i) * prime;
    }
    return hashKey % this.capacity;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2; // Double the size
    this.buckets = new Array(this.capacity).fill(null);
    this.numOfInserts = 0;

    oldBuckets.forEach((bucket) => {
      let current = bucket;
      while (current !== null) {
        this.add(current.key, current.value); // Keys are re-hashed
        current = current.next;
      }
    });
  }

  add(key, value) {
    if (this.numOfInserts / this.capacity >= this.loadFactor) {
      this.resize();
    }
    const hashKey = this.hash(key);
    if (!this.has(key)) {
      // if the hashmap doesn't contain key, add a new node
      const newNode = new Node(key, value);
      if (this.buckets[hashKey] === null) {
        this.numOfInserts++;
        this.buckets[hashKey] = newNode;
      } else {
        let current = this.buckets[hashKey];
        while (current.next !== null) {
          current = current.next;
        }
        current.next = newNode;
      }
    } else {
      // if the key exists, update the value
      let current = this.buckets[hashKey];
      while (current !== null && current.key !== key) {
        current = current.next;
      }
      if (current !== null) {
        current.value = value;
      }
    }
  }

  get(key) {
    const hashKey = this.hash(key);
    let current = this.buckets[hashKey];
    while (current.key !== null && current.key !== key) {
      current = current.next;
    }
    if (current === null) {
      return null;
    }
    return current.value;
  }

  has(key) {
    const hashKey = this.hash(key);
    let current = this.buckets[hashKey];
    while (current !== null) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  remove(key) {
    const hashKey = this.hash(key);
    let current = this.buckets[hashKey];
    let previous = null;

    while (current !== null && current.key !== key) {
      previous = current;
      current = current.next;
    }

    if (current === null) {
      return; // Key not found
    }

    if (previous === null && current.next === null) {
      // Remove first node that has no successors
      this.numOfInserts -= 1;
      this.buckets[hashKey] = current.next;
    } else if (previous === null) {
      // Remove first node that has successors
      this.buckets[hashKey] = current.next;
    } else {
      // Remove node and connects the next
      previous.next = current.next;
    }
  }

  length() {
    let counter = 0;
    this.buckets.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        counter++;
        while (current.next !== null) {
          counter++;
          current = current.next;
        }
      }
    });
    return counter;
  }

  clear() {
    this.buckets = new Array(16).fill(null);
    this.numOfInserts = 0;
  }

  keys() {
    const arrayOfKeys = [];
    this.buckets.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        arrayOfKeys.push(current.key);
        while (current.next !== null) {
          current = current.next;
          arrayOfKeys.push(current.key);
        }
      }
    });
    return arrayOfKeys;
  }

  values() {
    const arrayOfValues = [];
    this.buckets.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        arrayOfValues.push(current.value);
        while (current.next !== null) {
          current = current.next;
          arrayOfValues.push(current.value);
        }
      }
    });
    return arrayOfValues;
  }

  entries() {
    const arrayOfEntries = [];
    this.buckets.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        arrayOfEntries.push([current.key, current.value]);
        while (current.next !== null) {
          current = current.next;
          arrayOfEntries.push([current.key, current.value]);
        }
      }
    });
    return arrayOfEntries;
  }
}

const myMap = new HashMap();
myMap.add('user1', 'Birger');
console.log(myMap.get('user1'));
myMap.add('user2', 'Matias');
myMap.add('user3', 'Tom');
console.log(myMap.keys());
console.log(myMap.length());

console.log(myMap);
