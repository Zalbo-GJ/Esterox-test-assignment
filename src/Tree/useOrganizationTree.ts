import { useCallback, useState } from 'react';
import { Node } from './types';
import { v4 as uuidv4 } from 'uuid';

export const useOrganizationTree = () => {
  const [root, setRoot] = useState<Node>({
    type: 'Director',
    name: 'Director',
    children: [],
    id: uuidv4(),
  });

  const findParent = (searchNode: Node, target: Node): Node | null => {
    for (let child of searchNode.children) {
      if (child === target) return searchNode;
      const found = findParent(child, target);
      if (found) return found;
    }
    return null;
  };

  const deleteNode = useCallback((node: Node, deleteChildren: boolean) => {
    const parent = findParent(root, node);
    if (parent) {
      if (deleteChildren) {
        // Delete node and all its children
        const newChildren = parent.children.filter(child => child.id !== node.id);
        if (newChildren.length !== parent.children.length) {
          parent.children = newChildren;
          setRoot({ ...root });
        }
      } else {
        // Delete node and move its children up one level
        const index = parent.children.findIndex(child => child.id === node.id);
        if (index !== -1) {
          parent.children.splice(index, 1, ...node.children);
          setRoot({ ...root });
        }
      }
    }
  }, [root]);

  const addNodeOrdered = (parentNode: Node, nodeType: 'Subordinate' | 'BranchContainer' | 'BranchMember') => {
    const newNode: Node = {
      type: nodeType,
      name: nodeType,
      children: [],
      id: uuidv4(),
    };

    if (nodeType === 'BranchContainer') {
      const branchMember: Node = {
        type: 'BranchMember',
        name: 'BranchMember',
        children: [],
        id: uuidv4(),
      };
      newNode.children.push(branchMember);
    }

    setRoot((prevRoot) => {
      const updateNode = (node: Node): Node => {
        if (node.id === parentNode.id) {
          if (nodeType === 'BranchMember' && node.type === 'BranchContainer') {
            return { ...node, children: [...node.children, newNode] };
          } else if (nodeType !== 'BranchMember') {
            return { ...node, children: [...node.children, newNode] };
          }
          return node;
        }
        return { ...node, children: node.children.map(updateNode) };
      };
      return updateNode(prevRoot);
    });
  };

  const addBranchContainerAndDeleteNode = useCallback((node: Node) => {
    const parent = findParent(root, node);
    if (parent) {
      const newBranchContainer: Node = {
        type: 'BranchContainer',
        name: 'BranchContainer',
        children: [
          {
            type: 'BranchMember',
            name: 'BranchMember',
            children: [],
            id: uuidv4(),
          },
          {
            type: 'BranchMember',
            name: 'BranchMember',
            children: [],
            id: uuidv4(),
          },
          ...node.children
        ],
        id: uuidv4(),
      };

      const index = parent.children.findIndex(child => child.id === node.id);
      if (index !== -1) {
        parent.children[index] = newBranchContainer;
        setRoot({ ...root });
      }
    }
  }, [root]);

  

  const addSubordinate = useCallback((node: Node) => addNodeOrdered(node, 'Subordinate'), []);
  const addBranchContainer = useCallback((node: Node) => addNodeOrdered(node, 'BranchContainer'), []);
  const addBranchMember = useCallback((node: Node) => addNodeOrdered(node, 'BranchMember'), []);

  return {
    root,
    addSubordinate,
    addBranchContainer,
    addBranchMember,
    deleteNode,
    addBranchContainerAndDeleteNode,
  };
};