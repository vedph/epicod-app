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

  public region: string | undefined;
  public location: string | undefined;
  public type: string | undefined;
  public layout: string | undefined;
  public date: string | undefined;
  public references: string[] | undefined;

  constructor() {}

  ngOnInit(): void {}

  private getPropValue(name: string): string | undefined {
    return this._node?.properties?.find(p => p.name === name)?.value;
  }

  private getPropValues(name: string): string[] | undefined {
    // TODO
    return [];
  }

  private updateText(): void {
    if (!this._node) {
      this.lines = [];
      return;
    }
    const text = this.getPropValue('text');
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
    this.lines = lines;
  }

  private update(): void {
    this.updateText();
    this.region = this.getPropValue('region');
    this.location = this.getPropValue('location');
    // TODO
  }
}
