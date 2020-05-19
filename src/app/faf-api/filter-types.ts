import {QueryCondition} from './query-condition';

export interface FilterTypes {
  nameKey: string;
  apiField: string;
  operators: QueryCondition[];
  defaultOperator: QueryCondition;
  availableValues: any[];
}

export interface FilterItem {
  criterion: FilterTypes;
  operator: QueryCondition;
  value: string;
}
