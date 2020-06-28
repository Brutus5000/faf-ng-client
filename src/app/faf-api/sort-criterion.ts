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

  let expression = list
    .filter(it => it != null && it.criterion != null && it.direction != null)
    .map(it => (it.direction === SortOrder.DESCENDING ? '-' : '') + it.criterion.apiField)
    .join(',');

  if (expression.length === 0) {
    expression = null;
  }

  console.log('Created sort expression: ' + expression);

  return expression;
}

