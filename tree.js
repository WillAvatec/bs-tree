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
    let processed = preProcess();

    return {
        root : buildTree(processed,0,processed.length-1),
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

const example = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree(example);

prettyPrint(tree.root);
