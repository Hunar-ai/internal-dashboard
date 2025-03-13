import { useMemo } from 'react';
import { Column, Cell } from '@components/common/PaginatedTable';
import { HandleSortProps, Sort } from 'interfaces';
import { ColumnActionsPopOver } from '@components/common/ColumnActionsPopOver';
import { FILTER_TYPE, SORT_TYPE } from 'Enum';
import { useTableFilters } from 'hooks/useTableFilters';
import { Link } from '@mui/material';
import { DateCell } from '@components/common/DateCell';

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
    const { statusOptions } = useTableFilters();
    const columns: Array<Column> = useMemo(() => {
        return [
            // {
            //     id: 'id',
            //     accessor: 'id',
            //     Header: 'ID',
            //     headerText: 'Call ID',
            //     isVisible: true,
            //     minWidth: 175
            // },
            {
                id: 'status',
                accessor: 'status',
                Header: 'Status',
                isVisible: true,
                headerText: 'Call Status',
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
                id: 'mobileNumber',
                accessor: 'mobileNumber',
                Header: 'Mobile Number',
                headerText: 'Mobile Number',
                isVisible: true,
                minWidth: 175
            },
            {
                id: 'result',
                accessor: 'result',
                Header: 'Result',
                headerText: 'Call Result',
                isVisible: true,
                minWidth: 175,
                // Filter: ColumnActionsPopOver,
                // columnActionsProps: {
                //     sortProps: {
                //         sort,
                //         handleSort,
                //         sortType: SORT_TYPE.DEFAULT
                //     }
                // },
                Cell: ({ value }: Cell) => {
                    return <i>{value?.willingnessToProceed?.explanation ?? 'N/A'}</i>;
                }
            },
            {
                id: 'transcript',
                accessor: 'transcript',
                Header: 'Transcript',
                headerText: 'Call Transcript',
                isVisible: true,
                minWidth: 175,
                // Filter: ColumnActionsPopOver,
                // columnActionsProps: {
                //     sortProps: {
                //         sort,
                //         handleSort,
                //         sortType: SORT_TYPE.DEFAULT
                //     }
                // },
                Cell: ({ value }: string[]) => {
                    return <i> Total: {value?.length} </i>;
                }
            },
            {
                id: 'recordingUrl',
                accessor: 'recordingUrl',
                Header: 'Recording',
                headerText: 'Call Recording',
                isVisible: true,
                minWidth: 175,
                Cell: ({ value }: Cell) => {
                    return value ? (
                        <Link target="_blank" href={value} underline="hover">
                            Listen to Recording
                        </Link>
                    ) : (
                        <>-</>
                    );
                }
            },
            {
                id: 'context',
                accessor: 'context',
                Header: 'Context',
                headerText: 'Call Context',
                isVisible: true,
                minWidth: 175,
                Cell: ({ value }: Cell) => {
                    return <i>{value?.role ?? 'Role N/A'}</i>;
                }
            },
            {
                id: 'createdAt',
                accessor: 'createdAt',
                Header: 'Created At',
                headerText: 'Call Created At',
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
                id: 'durationSeconds',
                accessor: 'durationSeconds',
                Header: 'Duration',
                headerText: 'Call Duration',
                isVisible: true,
                minWidth: 175
            },
            {
                id: 'resumeUrl',
                accessor: 'resumeUrl',
                Header: 'Resume',
                headerText: 'Resume URL',
                isVisible: true,
                minWidth: 175,
                Cell: ({ value }: Cell) => {
                    return value ? (
                        <Link target="_blank" href={value} underline="hover">
                            View Resume
                        </Link>
                    ) : (
                        <>-</>
                    );
                }
            },
            {
                id: 'jobDescriptionUrl',
                accessor: 'jobDescriptionUrl',
                Header: 'JD',
                headerText: 'JD URL',
                isVisible: true,
                minWidth: 175,
                Cell: ({ value }: Cell) => {
                    return value ? (
                        <Link target="_blank" href={value} underline="hover">
                            View JD
                        </Link>
                    ) : (
                        <>-</>
                    );
                }
            }
        ];
    }, []);
    return columns;
};
