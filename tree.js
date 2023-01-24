const TreeNode = (data = null) => {
    return {
        data,
        left:null,
        right:null
    }
}

const Tree = (array) => {

   const buildTree = (arr,start,end) =>{

        // Stop when start is more the end
        if(start > end) return null;

        // Create a node with mid as root
        let mid = Math.floor((start+end)/2);
        const rootNode = TreeNode(arr[mid]);

        // Create a left subTree, where end is mid-1
        rootNode.left = buildTree(arr,start,mid-1);
        // Create a right subTree, where start is in the mid+1 and end is the length 
        rootNode.right = buildTree(arr, mid+1, end)

        return rootNode;
    }

    const preProcess = () => {
        const mergeSort = (sort) => {
            if(sort.length == 1) return sort;
    
            let mid = Math.floor((sort.length)/2);
            let left = sort.slice(0,mid);
            let right = sort.slice(mid);
    
            return merge(mergeSort(left),mergeSort(right))
    
        }
        const merge = (arrayA, arrayB) => {
            const sorted = [];
            let i = 0;
            let j = 0;
    
            while (i < arrayA.length && j < arrayB.length){
                if(arrayA[i] < arrayB[j]){
                    sorted.push(arrayA[i]);
                    i++;
                }else {
                    sorted.push(arrayB[j]);
                    j++;
                }
            }
    
            while(i < arrayA.length){
                sorted.push(arrayA[i]);
                i++;
            }
    
            while(j < arrayB.length){
                sorted.push(arrayB[j]);
                j++;
            }
    
            return sorted;
        }
        const remover = (toBeClean)=> {
            return Array.from(new Set(toBeClean))
        }

        // Sort the array
        let sorted = mergeSort(array);
        // Remove duplicated elements
        return remover(sorted);
    }

    const insert = (value, node = root) => {
        // Search the position that this value should be
        // Replace the leaf node with a new node with the value
        if(node.data < value) {
            if(node.right == null) return node.right = TreeNode(value);
            return insert(value, node.right);
        }
        if(node.data > value) {
            if(node.left == null) return node.left = TreeNode(value);
            return insert(value, node.left);
        }
    }

    const remove = (value, node = root) => {


        // Base case
        if (node === null) return node;

        // Traverse the tree, until find the value if exists

        if(node.data > value){
            node.left = remove(value, node.left);
        }
        if( node.data < value){
            node.right = remove(value, node.right);
        }

        // Find value now delete
        if(node.data === value){
            node = rmHelp(node);
            return
        }

        return node
    }

    const rmHelp = (node) => {

        // Returns null if node has no children
        
        if(!node.left && !node.right){
            return null;
        }

        // If has one child, returns that child

        if(!node.left) return node.right
        if(!node.right) return node.left

        // If has two children, returns the node just biggest than that
        // that can be accomplished by going to the right subtree and and then all the way to the left if it exits
        
        return findBiggest(node);
    }

    function findBiggest(node){

        let rightSubTree = node.right;

        if(!rightSubTree.left){
            rightSubTree.left = node.left;
            return rightSubTree
        };

        while(rightSubTree.left){
            rightSubTree = rightSubTree.left
        }

        rightSubTree.left = node.left;

        return rightSubTree
    }

    const find = (value, node = root) => {
        if(node === null) return 'Cannot find value';
        if(node.data === value) return node;
        if(value < node.data){
            return find(value, node.left);
        }
        if(value > node.data){
            return find(value, node.right);
        }
    }

    const levelOrder = (callback) => {
        
    }

    let sorted = preProcess();
    let root = buildTree(sorted,0,sorted.length-1);

    return {
        root : root,
        insert,
        remove,
        find
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

let tree1 = Tree([1, 7, 4, 6, 10,8 ,3,9,11,12]);
let v = 7;
prettyPrint(tree1.root);
tree1.remove(v);
console.log('Removing... ', v);
prettyPrint(tree1.root);
