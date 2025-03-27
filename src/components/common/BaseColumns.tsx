/* eslint-disable react/prop-types */
import {
    DateCell,
    TimeCell,
    type Cell as CellProps,
    ColumnActionsPopOver,
    HeaderCell
} from '@components/common';

import type { HandleSortProps, Sort } from 'interfaces';
import { SORT_TYPE } from 'Enum';

interface BaseColumnsProps {
    sort?: Sort;
    handleSort: HandleSortProps;
}

export class BaseColumns {
    sort?: Sort;
    handleSort: HandleSortProps;

    constructor({ sort, handleSort }: BaseColumnsProps) {
        this.sort = sort;
        this.handleSort = handleSort;
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
                    }
                },
                Cell: ({ value }: CellProps) => {
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
                Cell: ({ value }: CellProps) => {
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
                    }
                },
                Cell: ({ value }: CellProps) => {
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
                Cell: ({ value }: CellProps) => {
                    return <TimeCell value={value} />;
                }
            }
        ];
    };
}
