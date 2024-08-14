type NodeType = 'Director' | 'Subordinate' | 'BranchContainer' | 'BranchMember';

export interface Node {
  id: string;
  name: string;
  type: NodeType;
  children: Node[];
}