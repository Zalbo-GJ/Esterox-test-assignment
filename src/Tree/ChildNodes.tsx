import React from 'react';
import { Node } from './types';
import { TreeNode } from './TreeNode';

interface ChildNodesProps {
  node: Node;
  onAddSubordinate: (node: Node) => void;
  onAddBranchContainer: (node: Node) => void;
  onAddBranchMember: (node: Node) => void;
  deleteWithChildren: (node: Node) => void;
  deleteOnlyNode: (node: Node) => void;
  addBranchContainerAndDeleteNode: (node: Node) => void;
}

export const ChildNodes: React.FC<ChildNodesProps> = ({
  node,
  onAddSubordinate,
  onAddBranchContainer,
  onAddBranchMember,
  deleteWithChildren,
  deleteOnlyNode,
  addBranchContainerAndDeleteNode,
}) => {
  if (node.type === 'BranchContainer') {
    return (
      <ul className="children branch-members">
        {node.children.map((child: Node) => (
          <li key={child.id}>
            <TreeNode
              node={child}
              onAddSubordinate={onAddSubordinate}
              onAddBranchContainer={onAddBranchContainer}
              onAddBranchMember={onAddBranchMember}
              deleteWithChildren={deleteWithChildren}
              deleteOnlyNode={deleteOnlyNode}
              addBranchContainerAndDeleteNode={addBranchContainerAndDeleteNode}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="children other-children">
      {node.children.map((child: Node) => (
        <li key={child.id}>
          <TreeNode
            node={child}
            onAddSubordinate={onAddSubordinate}
            onAddBranchContainer={onAddBranchContainer}
            onAddBranchMember={onAddBranchMember}
            deleteWithChildren={deleteWithChildren}
            deleteOnlyNode={deleteOnlyNode}
            addBranchContainerAndDeleteNode={addBranchContainerAndDeleteNode}
          />
        </li>
      ))}
    </ul>
  );
};