import React, { memo } from 'react';
import { Node } from './types';
import { NodeButtons } from './NodeButtons';
import { ChildNodes } from './ChildNodes';

interface TreeNodeProps {
  node: Node;
  onAddSubordinate: (node: Node) => void;
  onAddBranchContainer: (node: Node) => void;
  onAddBranchMember: (node: Node) => void;
  deleteWithChildren: (node: Node) => void;
  deleteOnlyNode: (node: Node) => void;
  addBranchContainerAndDeleteNode: (node: Node) => void;
}

export const TreeNode: React.FC<TreeNodeProps> = memo(
  ({
    node,
    onAddSubordinate,
    onAddBranchContainer,
    onAddBranchMember,
    deleteWithChildren,
    deleteOnlyNode,
    addBranchContainerAndDeleteNode,
  }) => {
    return (
      <div className={`tree-node ${node.type.toLowerCase()}`}>
        {node.name !== 'BranchContainer' && <div className="node-content">{node.name}</div>}
        <NodeButtons
          node={node}
          onAddSubordinate={onAddSubordinate}
          onAddBranchContainer={onAddBranchContainer}
          onAddBranchMember={onAddBranchMember}
          deleteWithChildren={deleteWithChildren}
          deleteOnlyNode={deleteOnlyNode}
          addBranchContainerAndDeleteNode={addBranchContainerAndDeleteNode}
        />
        {node.children.length > 0 && (
          <ChildNodes
            node={node}
            onAddSubordinate={onAddSubordinate}
            onAddBranchContainer={onAddBranchContainer}
            onAddBranchMember={onAddBranchMember}
            deleteWithChildren={deleteWithChildren}
            deleteOnlyNode={deleteOnlyNode}
            addBranchContainerAndDeleteNode={addBranchContainerAndDeleteNode}
          />
        )}
      </div>
    );
  }
);