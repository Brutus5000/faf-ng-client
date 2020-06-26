export enum SortOrder {
  ASCENDING,
  DESCENDING,
}

export interface SortCriterion {
  nameKey: string;
  apiField: string;
}

export interface SortSelection {
  criterion: SortCriterion;
  direction: SortOrder;
}

export function buildSortExpression(selection: SortSelection | SortSelection[]): string {
  const list = [].concat(selection);

  return list
    .map(it => (it.direction === SortOrder.DESCENDING ? '-' : '') + it.criterion.apiField)
    .join(',');
}

