/* eslint-disable react/prop-types */
import {
    DateCell,
    TimeCell,
    type Cell,
    ColumnActionsPopOver,
    HeaderCell
} from '@components/common';

import type {
    DateFilterTypeMapProps,
    HandleSortProps,
    Sort,
    TableFiltersProps
} from 'interfaces';
import { FILTER_TYPE, SORT_TYPE } from 'Enum';

interface CommonColumnsProps {
    tableFilters: TableFiltersProps;
    sort?: Sort;
    isFilterEnabled?: boolean;
    dateFilterTypeMap?: DateFilterTypeMapProps;
    handleSort: HandleSortProps;
    setTableFilters: (_: TableFiltersProps) => void;
    setDateFilterTypeMap?: (_: DateFilterTypeMapProps) => void;
}

export class BaseColumns {
    sort?: Sort;
    handleSort: HandleSortProps;
    tableFilters: TableFiltersProps;
    dateFilterTypeMap?: DateFilterTypeMapProps;
    setTableFilters: (_: TableFiltersProps) => void;
    setDateFilterTypeMap?: (_: DateFilterTypeMapProps) => void;
    isFilterEnabled: boolean;

    constructor({
        tableFilters,
        sort,
        handleSort,
        setTableFilters,
        dateFilterTypeMap,
        setDateFilterTypeMap,
        isFilterEnabled = true
    }: CommonColumnsProps) {
        this.sort = sort;
        this.handleSort = handleSort;
        this.tableFilters = tableFilters;
        this.setTableFilters = setTableFilters;
        this.dateFilterTypeMap = dateFilterTypeMap;
        this.setDateFilterTypeMap = setDateFilterTypeMap;
        this.isFilterEnabled = isFilterEnabled;
    }

    getBaseColumns = () => {
        return [
            {
                id: 'createdAt',
                accessor: 'createdAt',
                exportId: 'createdOnDate',
                Header: HeaderCell,
                headerText: 'Created On',
                minWidth: 150,
                Filter: ColumnActionsPopOver,
                columnActionsProps: {
                    sortProps: {
                        sort: this.sort,
                        handleSort: this.handleSort,
                        sortType: SORT_TYPE.DATE
                    },
                    filterProps: this.isFilterEnabled
                        ? {
                              filterType: FILTER_TYPE.DATE_RANGE,
                              filters: {
                                  tableFilters: this.tableFilters,
                                  setTableFilters: this.setTableFilters,
                                  dateFilterTypeMap: this.dateFilterTypeMap,
                                  setDateFilterTypeMap:
                                      this.setDateFilterTypeMap
                              }
                          }
                        : undefined
                },
                Cell: ({ value }) => {
                    return <DateCell value={value} />;
                }
            },
            {
                id: 'createdAtTime',
                accessor: 'createdAt',
                exportId: 'createdOnTime',
                Header: HeaderCell,
                headerText: 'Created At',
                minWidth: 125,
                Cell: ({ value }: Cell) => {
                    return <TimeCell value={value} />;
                }
            },
            {
                id: 'updatedAt',
                accessor: 'updatedAt',
                exportId: 'updatedOnDate',
                Header: HeaderCell,
                headerText: 'Updated On',
                minWidth: 150,
                Filter: ColumnActionsPopOver,
                columnActionsProps: {
                    sortProps: {
                        sort: this.sort,
                        handleSort: this.handleSort,
                        sortType: SORT_TYPE.DATE
                    },
                    filterProps: this.isFilterEnabled
                        ? {
                              filterType: FILTER_TYPE.DATE_RANGE,
                              filters: {
                                  tableFilters: this.tableFilters,
                                  setTableFilters: this.setTableFilters,
                                  dateFilterTypeMap: this.dateFilterTypeMap,
                                  setDateFilterTypeMap:
                                      this.setDateFilterTypeMap
                              }
                          }
                        : undefined
                },
                Cell: ({ value }: Cell) => {
                    return <DateCell value={value} />;
                }
            },
            {
                id: 'updatedAtTime',
                accessor: 'updatedAt',
                exportId: 'updatedOnTime',
                Header: HeaderCell,
                headerText: 'Updated At',
                minWidth: 125,
                Cell: ({ value }: Cell) => {
                    return <TimeCell value={value} />;
                }
            }
        ];
    };
}
