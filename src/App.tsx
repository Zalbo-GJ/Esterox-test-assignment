import { useCallback } from 'react';
import './App.css';
import { useOrganizationTree } from './Tree/useOrganizationTree';
import { TreeNode } from './Tree/TreeNode';
import { Node } from './Tree/types';

function App() {
  const { root, addSubordinate, addBranchContainer, addBranchMember, deleteNode, addBranchContainerAndDeleteNode } =
    useOrganizationTree();

  const handleAddSubordinate = useCallback((node: Node) => addSubordinate(node), [addSubordinate]);
  const handleAddBranchContainer = useCallback(
    (node: Node) => addBranchContainer(node),
    [addBranchContainer]
  );
  const handleAddBranchMember = useCallback(
    (node: Node) => addBranchMember(node),
    [addBranchMember]
  );
  const deleteWithChildren = useCallback((node: Node) => deleteNode(node, true), [deleteNode]);
  const deleteOnlyNode = useCallback((node: Node) => deleteNode(node, false), [deleteNode]);
  const handleAddBranchContainerAndDeleteNode = useCallback(
    (node: Node) => addBranchContainerAndDeleteNode(node),
    [addBranchContainerAndDeleteNode]
  );

  return (
    <div className="app">
      <h1>Organization Tree</h1>
      <h4>+ : Add Branch Member</h4>
      <h4>... : Add Subordinate</h4>
      <h4>X : Delete Only Node</h4>
      <h4>X* : Delete with Children</h4>
      <h4>BC : Add Branch Container and Delete Node</h4>
      <div className="tree-outer-container">
        <div className="tree-container">
          <TreeNode
            node={root}
            onAddSubordinate={handleAddSubordinate}
            onAddBranchContainer={handleAddBranchContainer}
            onAddBranchMember={handleAddBranchMember}
            deleteWithChildren={deleteWithChildren}
            deleteOnlyNode={deleteOnlyNode}
            addBranchContainerAndDeleteNode={handleAddBranchContainerAndDeleteNode}
          />
        </div>
      </div>
    </div>
  );
}

export default App;