import {QueryCondition} from './query-condition';

export interface FilterCriterion {
  nameKey: string;
  apiField: string;
  operators: QueryCondition[];
  defaultOperator: QueryCondition;
  availableValues: any[];
}
