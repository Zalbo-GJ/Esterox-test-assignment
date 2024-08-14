import React from 'react';
import { Node } from './types';

interface NodeButtonsProps {
  node: Node;
  onAddSubordinate: (node: Node) => void;
  onAddBranchContainer: (node: Node) => void;
  onAddBranchMember: (node: Node) => void;
  deleteWithChildren: (node: Node) => void;
  deleteOnlyNode: (node: Node) => void;
  addBranchContainerAndDeleteNode: (node: Node) => void;
}

export const NodeButtons: React.FC<NodeButtonsProps> = ({
  node,
  onAddSubordinate,
  onAddBranchContainer,
  onAddBranchMember,
  deleteWithChildren,
  deleteOnlyNode,
  addBranchContainerAndDeleteNode,
}) => {
  return (
    <div className="node-buttons">
      {node.type !== 'BranchContainer' && (
        <button onClick={() => onAddSubordinate(node)}>...</button>
      )}
      {node.type === 'Director' && (
        <button onClick={() => onAddBranchContainer(node)}>+</button>
      )}

      {node.type === 'BranchContainer' && (
        <button onClick={() => onAddBranchMember(node)}>+</button>
      )}

      {node.type === 'Subordinate' && <button onClick={() => deleteOnlyNode(node)}>X</button>}
      {node.type === 'BranchMember' && <button onClick={() => deleteOnlyNode(node)}>X</button>}
      {node.type !== 'BranchMember' && node.type !== 'BranchContainer' && node.type !== 'Director' && (
        <button onClick={() => deleteWithChildren(node)}> X*</button>
      )}
      {node.type === 'BranchContainer' && (
        <button onClick={() => deleteWithChildren(node)}> X</button>
      )}

      {node.type === 'Subordinate' && (
        <button onClick={() => addBranchContainerAndDeleteNode(node)}>+</button>
      )}
    </div>
  );
};
