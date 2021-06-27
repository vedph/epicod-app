import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';

import { TextNode } from '@myrmidon/epicod-core';
import { EpicodApiService } from '@myrmidon/epicod-api';

/**
 * Node viewmodel used in EpicodTreeDataSource.
 */
export interface NodeViewModel extends TextNode {
  level: number;
  loading?: boolean;
}

// https://stackblitz.com/angular/bqnqjjvgjym?file=app%2Ftree-dynamic-example.ts
// https://stackblitz.com/angular/goolrxyjjee?file=app%2Fcdk-tree-flat-example.ts
// https://gist.github.com/Bludwarf/17a20ebe5e38aa34e8bfe5a6752e50ea
// https://material.angular.io/cdk/tree/overview
// @dynamic
@Injectable({
  providedIn: 'root',
})
export class EpicodTreeDataSource {
  public data$: BehaviorSubject<NodeViewModel[]>;

  public pageSize: number;

  /**
   * The nodes in the tree.
   */
  public get data(): NodeViewModel[] {
    return this.data$.value;
  }
  public set data(value: NodeViewModel[]) {
    this._tree.dataNodes = value;
    this.data$.next(value);
  }

  constructor(
    private _apiService: EpicodApiService,
    private _tree: FlatTreeControl<NodeViewModel>
  ) {
    this.pageSize = 20;
    this.data$ = new BehaviorSubject<NodeViewModel[]>([this.getRoot()]);
  }

  private getRoot(): NodeViewModel {
    // root node has ID -1 and Y -1
    return {
      id: -1,
      corpus: '',
      level: 1,
      y: -1,
      x: 1,
      name: 'CORPORA',
      isExpandable: true
    };
  }

  private countHiddenDescendants(node: NodeViewModel): number {
    let count = 0;
    if (!this._tree.isExpanded(node)) {
      this._tree.getDescendants(node).map((child) => {
        count += 1 + this.countHiddenDescendants(child);
      });
    }
    return count;
  }

  private expandOrCollapse(
    node: NodeViewModel,
    children: NodeViewModel[],
    expand: boolean
  ): void {
    // TODO add controller nodes for paging
    const index = this.data.indexOf(node);
    if (expand) {
      this.data.splice(index + 1, 0, ...children);
    } else {
      this.data.splice(index + 1, children.length);
    }
    // notify changes
    this.data$.next(this.data);
    node.loading = false;
  }

  private toggleNode(node: NodeViewModel, expand: boolean): void {
    // find the node to toggle
    const index = this.data.indexOf(node);
    if (index === -1) {
      return;
    }

    // load its children
    node.loading = true;

    // expanding root means getting corpora
    if (node.id === -1) {
      this._apiService
        .getCorpora()
        .pipe(take(1))
        .subscribe(
          (corpora) => {
            node.loading = false;
            const nodes = corpora.map((s, i) => {
              return {
                id: 0,
                corpus: s,
                level: 2,
                y: 0,
                x: i + 1,
                name: s,
                isExpandable: true
              };
            });
            // nothing to do if it has no children
            if (!nodes.length) {
              node.loading = false;
              return;
            }
            // expand/collapse as requested
            this.expandOrCollapse(node, nodes, expand);
          },
          (error) => {
            node.loading = false;
            console.error('Error expanding corpus ' + node.id);
            if (error) {
              console.error(JSON.stringify(error));
            }
          }
        );
      return;
    }

    // else, we're working with true nodes
    this._apiService
      .getNodes({
        pageNumber: 1,
        pageSize: this.pageSize,
        parentId: node.id,
        corpusId: node.corpus
      })
      .pipe(take(1))
      .subscribe(
        (page) => {
          // nothing to do if it has no children
          if (!page.total) {
            node.loading = false;
            return;
          }
          // expand/collapse as requested
          this.expandOrCollapse(
            node,
            page.items.map((n) => {
              return {
                ...n,
                level: n.y + 2,
              };
            }),
            expand
          );
        },
        (error) => {
          node.loading = false;
          console.error('Error expanding node ' + node.id);
          if (error) {
            console.error(JSON.stringify(error));
          }
        }
      );
  }

  private handleTreeChange(change: SelectionChange<NodeViewModel>): void {
    if (change.added) {
      change.added.forEach((node) => {
        this.toggleNode(node, true);
      });
    }
    if (change.removed) {
      change.removed.reverse().forEach((node) => this.toggleNode(node, false));
    }
  }

  public connect(viewer: CollectionViewer): Observable<NodeViewModel[]> {
    this._tree.expansionModel.changed.subscribe((change) => {
      if (change.added || change.removed) {
        this.handleTreeChange(change);
      }
    });
    return merge(viewer.viewChange, this.data$).pipe(map(() => this.data));
  }
}
