import { Component, OnInit } from '@angular/core';
import { TextNode } from '@myrmidon/epicod-core';

@Component({
  selector: 'epicod-browser',
  templateUrl: './epicod-browser.component.html',
  styleUrls: ['./epicod-browser.component.css']
})
export class EpicodBrowserComponent implements OnInit {
  public node: TextNode | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public onNodePick(node: TextNode): void {
    this.node = node;
  }
}
