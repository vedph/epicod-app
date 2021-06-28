import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService, ErrorService } from '@myrmidon/epicod-core';
import { TextNode } from '@myrmidon/epicod-core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

/**
 * A page of data.
 */
export interface DataPage<T> {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  total: number;
  items: T[];
}

/**
 * Filter for text nodes.
 */
export interface TextNodeFilter {
  pageNumber: number;
  pageSize: number;
  corpusId?: string;
  parentId?: number;
}

/**
 * EpiCod API service.
 */
@Injectable({
  providedIn: 'root',
})
export class EpicodApiService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  public getCorpora(): Observable<string[]> {
    return this._http
      .get<string[]>(this._env.get('apiUrl') + 'corpora')
      .pipe(retry(3), catchError(this._error.handleError));
  }

  public getNodes(filter: TextNodeFilter): Observable<DataPage<TextNode>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', filter.pageNumber.toString());
    httpParams = httpParams.set('pageSize', filter.pageSize.toString());
    if (filter.corpusId) {
      httpParams = httpParams.set('corpusId', filter.corpusId);
    }
    if (filter.parentId) {
      httpParams = httpParams.set('parentId', filter.parentId.toString());
    }

    return this._http
      .get<DataPage<TextNode>>(this._env.get('apiUrl') + 'nodes', {
        params: httpParams,
      })
      .pipe(retry(3), catchError(this._error.handleError));
  }

  public getNode(id: number, propFilters?: string): Observable<TextNode> {
    return this._http
      .get<TextNode>(this._env.get('apiUrl') + 'nodes/' + id)
      .pipe(retry(3), catchError(this._error.handleError));
  }
}
