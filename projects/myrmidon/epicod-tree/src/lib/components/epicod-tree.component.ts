import { FlatTreeControl } from '@angular/cdk/tree';
import { EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';

import { EpicodApiService } from '@myrmidon/epicod-api';
import { TextNode } from '@myrmidon/epicod-core';
import { take } from 'rxjs/operators';
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
  public nodePick: EventEmitter<TextNode>;

  // public getLevel = (node: NodeViewModel): number => {
  //   return node.level;
  // };

  public isExpandable = (index: number): boolean => {
    const node = this.source.data[index];
    return node.isExpandable ? true : false;
  };

  constructor(private _apiService: EpicodApiService) {
    this.nodePick = new EventEmitter<TextNode>();
    this.tree = new FlatTreeControl<NodeViewModel>(
      (n: NodeViewModel) => n.level,
      (n: NodeViewModel) => (n.isExpandable ? true : false)
    );
    //   this.getLevel,
    //   this.isExpandable
    // );
    this.source = new EpicodTreeDataSource(_apiService, this.tree);
    this.pageSize = 20;
  }

  public pickNode(node: NodeViewModel): void {
    node.loading = true;
    this._apiService
      .getNode(node.id)
      .pipe(take(1))
      .subscribe(
        (leaf) => {
          node.loading = false;
          if (leaf) {
            this.nodePick.emit(leaf);
          }
        },
        (error) => {
          node.loading = false;
          console.error('Error loading node ' + node.id);
          if (error) {
            console.error(JSON.stringify(error));
          }
        }
      );
  }
}
