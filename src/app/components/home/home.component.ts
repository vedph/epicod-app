import { Component, OnInit } from '@angular/core';
import { NodeViewModel } from '@myrmidon/epicod-text-node-tree';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public node: NodeViewModel | undefined;

  constructor() {}

  ngOnInit(): void {}

  public onNodePick(node: NodeViewModel): void {
    this.node = node;
  }
}
