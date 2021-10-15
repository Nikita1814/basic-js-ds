const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    this.tree = addInside(this.tree, data);

    function addInside(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addInside(node.left, data);
      }
      {
        node.right = addInside(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchInside(this.tree, data);

    function searchInside(node, data) {
      if (!node) {
        return false;
      }
      if ((node.data === data)) {
        return true;
      }
      if (data > node.data) {
       return searchInside(node.right, data);
      } else {
       return searchInside(node.left, data);
      }
    }
  }

  find(data) {
    return findInside(this.tree, data);

    function findInside(node, data) {
      if (!node) {
        return null;
      }
      if ((node.data === data)) {
        return node;
      }
      if (data > node.data) {
        return findInside(node.right, data);
      } else {
         return findInside(node.left, data);
      }
    }
  }

  remove(data) {
    this.tree = deleteData(this.tree, data);
    function deleteData(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = deleteData(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = deleteData(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }
        if (!node.left) {
          node = node.right;
          return node;
        } else {
          let maxFromLeft = node.left;
          while (maxFromLeft.right) {
            maxFromLeft = maxFromLeft.right;
          }
          node.data = maxFromLeft.data;
          node.left = deleteData(node.left, maxFromLeft.data);
          return node
        }
      }
    }
  }

  min() {
    if (!this.tree) {
      return null;
    }
    let node = this.tree;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.tree) {
      return null;
    }
    let node = this.tree;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
};
