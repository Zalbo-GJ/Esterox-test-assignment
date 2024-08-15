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

export const NodeButtonTop: React.FC<NodeButtonsProps> = ({
  node,

  onAddBranchMember,
  deleteWithChildren,
  deleteOnlyNode,
  addBranchContainerAndDeleteNode,
}) => {
  return (
    <div className="node-buttons-top">
      {node.type === 'Subordinate' && (
        <button onClick={() => addBranchContainerAndDeleteNode(node)}>+</button>
      )}
      {node.type === 'BranchContainer' && (
        <button onClick={() => onAddBranchMember(node)}>+</button>
      )}
      {node.type === 'Subordinate' && <button onClick={() => deleteOnlyNode(node)}>X</button>}
      {node.type === 'BranchMember' && <button onClick={() => deleteOnlyNode(node)}>X</button>}
      {node.type !== 'BranchMember' &&
        node.type !== 'BranchContainer' &&
        node.type !== 'Director' && <button onClick={() => deleteWithChildren(node)}>X*</button>}
      {node.type === 'BranchContainer' && (
        <button onClick={() => deleteWithChildren(node)}>X</button>
      )}
    </div>
  );
};

export const NodeButtonBottom: React.FC<NodeButtonsProps> = ({
  node,
  onAddSubordinate,
  onAddBranchContainer,
}) => {
  return (
    <div className="node-buttons-bottom">
      {/* {node.type !== 'BranchContainer' && 
      ( */}
      <button onClick={() => onAddSubordinate(node)}>...</button>
      {/* )} */}
      {node.type === 'Director' && <button onClick={() => onAddBranchContainer(node)}>+</button>}
    </div>
  );
};

export const NodeButtons: React.FC<NodeButtonsProps> = (props) => {
  return (
    <>
      <NodeButtonTop {...props} />
      <NodeButtonBottom {...props} />
    </>
  );
};
