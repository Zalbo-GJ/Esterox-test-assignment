export type NodeType = 'Director' | 'Subordinate' | 'BranchContainer' | 'BranchMember' | 'SubordinateContainer';

export interface Node {
  type: NodeType;
  name: string;
  children: Node[];
  id: string;
  parentId?: string;
}