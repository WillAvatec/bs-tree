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
            
            // Set node to null if node has no children
            
            if(!node.left && !node.right) return node = null;

            // If has one child, returns that child

            if(!node.left) return node = node.right;
            if(!node.right) return node = node.left;
            
            // If has two children
            console.log('First Node',node);
            
            // Find findMinFromLeft
            let temp = findBiggest(node);
            console.log('temp',temp);

            // Copy tmp.data to node.data
            node.data = temp.data;
            console.log('Node data must be equal to temp,data',node);

            // Delete duplicate
            node.right = remove(node.right,node.right);
            console.log('right changed',node);

        } 
        return node;
    }

    function findBiggest(node){

        let rightSubTree = node.right;

        if(!rightSubTree.left){
            return rightSubTree
        };

        while(rightSubTree.left){
            rightSubTree = rightSubTree.left
        }

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

    const levelOrder = (callback, node = root) => {
        let queue = [];
        let array = [];
        if(node) queue.push(node);

        while(queue[0]){
            callback ? callback(queue[0]) : array.push(queue[0].data) ;
            if(queue[0].left) queue.push(queue[0].left);
            if(queue[0].right) queue.push(queue[0].right);
            queue.shift();
        }

        if(array.length > 0) return array;

    }
    
    const inorder = (callback, node = root, array = []) => {
        if(node === null) return;

        inorder(callback, node.left, array);
        callback ? callback(node) : array.push(node.data);
        inorder(callback, node.right, array);

        if(array.length > 0) return array;
    }

    const preOrder = (callback,node = root, array = []) => {
        if(node === null) return;

        callback ? callback(node) : array.push(node.data);
        preOrder(callback, node.left, array);
        preOrder(callback, node.right, array);

        if(array.length > 0) return array;
    }

    const postOrder = (callback,node = root, array = []) => {
        if(node === null) return;

        postOrder(callback, node.left, array);
        postOrder(callback, node.right, array);
        callback ? callback(node) : array.push(node.data);

        if(array.length > 0) return array;
    }

    const height = (node = root)=> {
        if(node === null) return 0;

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        return Math.max(leftHeight, rightHeight) + 1
    }

    const depth = (value, node = root, counter = 1) => {
        if(node === null) return 0
        if(node.data === value) return counter

        if(node.data < value){
            return depth(value,node.right, ++counter)
        }else{
            return depth(value,node.left, ++counter)
        }
    }

    const isBalanced = (node = root) => {

    }

    const rebalance = () => {
        let array = inorder();
        this.root = buildTree(array,0,array.length-1);
    }


    let sorted = preProcess();
    let root = buildTree(sorted,0,sorted.length-1);

    return {
        root : root,
        insert,
        remove,
        find,
        levelOrder,
        height,
        depth,
        inorder,
        preOrder,
        postOrder,
        isBalanced,
        rebalance
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



function remove(tree, value) {
    let v = value;
    prettyPrint(tree.root);
    tree1.remove(v);
    console.log('\nRemoving... ', v,'\n\n');
    prettyPrint(tree.root);

    return 'done';
}

let tree1 = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

remove(tree1,23)