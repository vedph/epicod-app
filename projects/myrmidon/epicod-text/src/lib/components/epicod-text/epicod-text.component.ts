import { Component, Input, OnInit } from '@angular/core';
import { TextNode } from '@myrmidon/epicod-core';

export interface LineViewModel {
  nr: number;
  label?: string;
  text: string;
}

@Component({
  selector: 'epicod-text',
  templateUrl: './epicod-text.component.html',
  styleUrls: ['./epicod-text.component.css'],
})
export class EpicodTextComponent implements OnInit {
  private _node: TextNode | undefined;

  public lines?: LineViewModel[];

  @Input()
  public get node(): TextNode | undefined {
    return this._node;
  }
  public set node(value: TextNode | undefined) {
    this._node = value;
    this.update();
  }

  constructor() {}

  ngOnInit(): void {}

  private update(): void {
    this.lines = [];

    if (!this._node) {
      return;
    }
    const text = this._node.properties?.find((p) => p.name === 'text')?.value;
    if (!text) {
      return;
    }
    const lines: LineViewModel[] = [];
    text.split('\n').forEach((l, i) => {
      const ti = l.indexOf('\t');
      let label = '';
      let text = l;

      if (ti > -1) {
        label = l.substr(0, ti);
        text = l.substr(ti + 1);
      }
      lines.push({
        nr: i + 1,
        label: label,
        text: text,
      });
    });
  }
}
