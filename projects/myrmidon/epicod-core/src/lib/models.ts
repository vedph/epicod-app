export interface TextNode {
  id: number;
  corpus: string;
  parentId?: number;
  isExpandable?: boolean;
  y: number;
  x: number;
  name: string;
  uri?: string;
  properties?: TextNodeProperty[];
}

export interface TextNodeProperty {
  name: string;
  value: string;
}
