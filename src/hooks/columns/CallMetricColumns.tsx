import { useMemo, useContext } from 'react';
import { Column, Cell } from '@components/common/paginatedTable/PaginatedTable';
import { HandleSortProps, Sort } from 'interfaces';
import { ColumnActionsPopOver } from '@components/common/ColumnActionsPopOver';
import { COLUMN_STICKY_TYPE, FILTER_TYPE, SORT_TYPE } from 'Enum';
import { useTableFilters } from 'hooks/useTableFilters';
import {
    Context,
    DataCell,
    DataLinkCell,
    HeaderCell,
    Result,
    Transcript
} from '@components/common';
import { DateCell } from '@components/common/DateCell';
import { SettingsContext } from 'contexts';

export interface CallMetricColumnsProps {
    tableFilters: any;
    setTableFilters: (_: any) => void;
    sort: Sort;
    handleSort: HandleSortProps;
}

export const CallMetricColumns = ({
    sort,
    handleSort,
    tableFilters,
    setTableFilters
}: CallMetricColumnsProps) => {
    const { formFields } = useContext(SettingsContext);
    const { statusOptions } = useTableFilters(formFields);
    const columns: Array<Column> = useMemo(() => {
        return [
            {
                id: 'id',
                accessor: 'id',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Call ID',
                isVisible: true,
                minWidth: 175,
                allowCopy: true,
                sticky: COLUMN_STICKY_TYPE.LEFT
            },
            {
                id: 'createdAt',
                accessor: 'createdAt',
                Header: HeaderCell,
                headerText: 'Created At',
                isVisible: true,
                minWidth: 175,
                Filter: ColumnActionsPopOver,
                columnActionsProps: {
                    sortProps: {
                        sort,
                        handleSort,
                        sortType: SORT_TYPE.DATE
                    },
                    filterProps: {
                        filterType: FILTER_TYPE.DATE_RANGE,
                        filters: {
                            tableFilters,
                            setTableFilters,
                            hideBlanks: true
                        }
                    }
                },
                Cell: ({ value }: Cell) => {
                    return <DateCell value={value} />;
                }
            },
            {
                id: 'status',
                accessor: 'status',
                Header: HeaderCell,
                Cell: DataCell,
                isVisible: true,
                headerText: 'Status',
                minWidth: 175,
                Filter: ColumnActionsPopOver,
                columnActionsProps: {
                    sortProps: {
                        sort,
                        handleSort,
                        sortType: SORT_TYPE.DEFAULT
                    },
                    filterProps: {
                        filterType: FILTER_TYPE.MULTI_SELECT,
                        options: statusOptions,
                        filters: {
                            tableFilters,
                            setTableFilters,
                            hideBlanks: true
                        }
                    }
                }
            },
            {
                id: 'durationSeconds',
                accessor: 'durationSeconds',
                Header: HeaderCell,
                headerText: 'Duration (sec)',
                isVisible: true,
                minWidth: 175,
                Filter: ColumnActionsPopOver,
                Cell: DataCell,
                columnActionsProps: {
                    sortProps: {
                        sort,
                        handleSort,
                        sortType: SORT_TYPE.NUMERIC
                    }
                }
            },
            {
                id: 'recordingUrl',
                accessor: 'recordingUrl',
                Header: HeaderCell,
                headerText: 'Recording',
                isVisible: true,
                minWidth: 175,
                Cell: ({ value }: Cell) => {
                    return (
                        <DataLinkCell link={value} text="Listen to Recording" />
                    );
                }
            },
            {
                id: 'transcript',
                accessor: 'transcript',
                Header: HeaderCell,
                headerText: 'Transcript',
                isVisible: true,
                minWidth: 175,
                Cell: Transcript
            },
            {
                id: 'result',
                accessor: 'result',
                Header: HeaderCell,
                headerText: 'Result',
                isVisible: true,
                minWidth: 175,
                Cell: Result
            },
            {
                id: 'context',
                accessor: 'context',
                Header: HeaderCell,
                headerText: 'Context',
                isVisible: true,
                minWidth: 175,
                Cell: Context
            },
            {
                id: 'mobileNumber',
                accessor: 'mobileNumber',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Mobile Number',
                isVisible: true,
                minWidth: 175
            },
            {
                id: 'resumeUrl',
                accessor: 'resumeUrl',
                Header: HeaderCell,
                headerText: 'Resume URL',
                isVisible: true,
                minWidth: 175,
                Cell: ({ value }: Cell) => {
                    return <DataLinkCell link={value} text="View Resume" />;
                }
            },
            {
                id: 'jobDescriptionUrl',
                accessor: 'jobDescriptionUrl',
                Header: HeaderCell,
                headerText: 'JD URL',
                isVisible: true,
                minWidth: 175,
                Cell: ({ value }: Cell) => {
                    return <DataLinkCell link={value} text="View JD" />;
                }
            }
        ];
    }, [handleSort, setTableFilters, sort, statusOptions, tableFilters]);

    return columns;
};
