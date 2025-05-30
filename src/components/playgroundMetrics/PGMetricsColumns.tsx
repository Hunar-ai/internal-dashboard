import React from 'react';

import { Column, Cell } from '@components/common/paginatedTable/PaginatedTable';
import { ColumnActionsPopOver } from '@components/common/ColumnActionsPopOver';
import { CallEndedByCell } from '@components/nehaAgents';
import {
    CallStatusCell,
    ContextCell,
    ResultCell,
    TranscriptCell
} from '@components/playgroundMetrics';
import {
    DataCell,
    DataLinkCell,
    HeaderCell,
    DateCell
} from '@components/common';

import { useTableFilters } from 'hooks/useTableFilters';
import { SettingsContext } from 'contexts';

import { COLUMN_STICKY_TYPE, FILTER_TYPE, SORT_TYPE } from 'Enum';
import type { HandleSortProps, Sort } from 'interfaces';
import { TimeUtils } from 'utils';

export interface PlayGroundMetricsColumnsProps {
    tableFilters: any;
    setTableFilters: (_: any) => void;
    sort?: Sort;
    handleSort: HandleSortProps;
}

export const PlayGroundMetricsColumns = ({
    sort,
    handleSort,
    tableFilters,
    setTableFilters
}: PlayGroundMetricsColumnsProps) => {
    const { formFields } = React.useContext(SettingsContext);
    const { statusOptions } = useTableFilters(formFields);

    const columns: Array<Column> = React.useMemo(() => {
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
                id: 'mobileNumber',
                accessor: 'mobileNumber',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Mobile Number',
                isVisible: true,
                minWidth: 175
            },
            {
                id: 'status',
                accessor: 'status',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return <CallStatusCell status={value} />;
                },
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
                headerText: 'Duration',
                isVisible: true,
                minWidth: 175,
                Filter: ColumnActionsPopOver,
                Cell: ({ value, ...props }: Cell) => {
                    const seconds = TimeUtils.formatSeconds(value ?? 0);
                    return <DataCell cell={{ ...props, value: seconds }} />;
                },
                columnActionsProps: {
                    sortProps: {
                        sort,
                        handleSort,
                        sortType: SORT_TYPE.NUMERIC
                    }
                }
            },
            {
                id: 'callEndedBy',
                accessor: 'callEndedBy',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return <CallEndedByCell callEndedBy={value} />;
                },
                isVisible: true,
                headerText: 'Call Ended By',
                minWidth: 225,
                Filter: ColumnActionsPopOver,
                columnActionsProps: {
                    sortProps: {
                        sort,
                        handleSort,
                        sortType: SORT_TYPE.DEFAULT
                    },
                    filterProps: {
                        filterType: FILTER_TYPE.MULTI_SELECT,
                        options: formFields?.nehaCallEndedBy ?? [],
                        filters: {
                            tableFilters,
                            setTableFilters,
                            hideBlanks: true
                        }
                    }
                }
            },
            {
                id: 'transcript',
                accessor: 'transcript',
                Header: HeaderCell,
                headerText: 'Transcript',
                isVisible: true,
                minWidth: 175,
                Cell: TranscriptCell
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
                id: 'result',
                accessor: 'result',
                Header: HeaderCell,
                headerText: 'Result',
                isVisible: true,
                minWidth: 175,
                Cell: ResultCell
            },
            {
                id: 'context',
                accessor: 'context',
                Header: HeaderCell,
                headerText: 'Context',
                isVisible: true,
                minWidth: 175,
                Cell: ContextCell
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
            },
            {
                id: 'createdAt',
                accessor: 'createdAt',
                Header: HeaderCell,
                headerText: 'Created At',
                isVisible: true,
                minWidth: 175,
                sticky: COLUMN_STICKY_TYPE.RIGHT,
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
            }
        ];
    }, [
        handleSort,
        setTableFilters,
        sort,
        statusOptions,
        tableFilters,
        formFields?.nehaCallEndedBy
    ]);

    return columns;
};
