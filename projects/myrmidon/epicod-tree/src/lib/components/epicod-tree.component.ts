import { FlatTreeControl } from '@angular/cdk/tree';
import { EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';

import { EpicodApiService } from '@myrmidon/epicod-api';
import {
  EpicodTreeDataSource,
  NodeViewModel,
} from '../services/epicod-tree-data-source';

@Component({
  selector: 'epicod-tree',
  templateUrl: './epicod-tree.component.html',
  styleUrls: ['./epicod-tree.component.css'],
})
export class EpicodTreeComponent {
  public source: EpicodTreeDataSource;
  public pageSize: number;
  public tree: FlatTreeControl<NodeViewModel>;

  @Output()
  public nodePick: EventEmitter<NodeViewModel>;

  // public getLevel = (node: NodeViewModel): number => {
  //   return node.level;
  // };

  public isExpandable = (index: number): boolean => {
    const node = this.source.data[index];
    return node.isExpandable ? true : false;
  };

  constructor(apiService: EpicodApiService) {
    this.nodePick = new EventEmitter<NodeViewModel>();
    this.tree = new FlatTreeControl<NodeViewModel>(
      (n: NodeViewModel) => n.level,
      (n: NodeViewModel) => (n.isExpandable ? true : false)
    );
    //   this.getLevel,
    //   this.isExpandable
    // );
    this.source = new EpicodTreeDataSource(apiService, this.tree);
    this.pageSize = 20;
  }

  public pickNode(node: NodeViewModel): void {
    this.nodePick.emit(node);
  }
}
