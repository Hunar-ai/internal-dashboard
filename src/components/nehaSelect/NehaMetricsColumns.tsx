import React from 'react';

import { Column, Cell } from '@components/common/paginatedTable/PaginatedTable';
import { ColumnActionsPopOver } from '@components/common/ColumnActionsPopOver';
import { DateCell } from '@components/common/DateCell';
import { CallStatusCell, TranscriptCell } from '@components/playgroundMetrics';
import { DataCell, DataLinkCell, HeaderCell } from '@components/common';

import { useTableFilters } from 'hooks/useTableFilters';
import { SettingsContext } from 'contexts';

import type { HandleSortProps, Sort } from 'interfaces';
import { COLUMN_STICKY_TYPE, FILTER_TYPE, SORT_TYPE } from 'Enum';

export interface NehaMetricsColumnsProps {
    sort?: Sort;
    handleSort: HandleSortProps;
    tableFilters: any;
    setTableFilters: (_: any) => void;
}

export const NehaMetricsColumns = ({
    sort,
    handleSort,
    tableFilters,
    setTableFilters
}: NehaMetricsColumnsProps) => {
    const { formFields } = React.useContext(SettingsContext);
    const { statusOptions } = useTableFilters(formFields);

    const columns: Array<Column> = React.useMemo(() => {
        return [
            {
                id: 'name',
                accessor: 'name',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Candidate Name',
                isVisible: true,
                minWidth: 175,
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
                id: 'jobRole',
                accessor: 'jobRole',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Job Role',
                isVisible: true,
                minWidth: 175
            },
            {
                id: 'companyName',
                accessor: 'companyName',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Company Name',
                isVisible: true,
                minWidth: 175
            },
            {
                id: 'callsCount',
                accessor: 'callsList.length',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Calls Count',
                isVisible: true,
                minWidth: 175
            },
            {
                id: 'status',
                accessor: 'callsList.0.status',
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
                id: 'callLater',
                accessor: 'callsList.0.callLater',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return <DataCell cell={{ value: value ? 'Yes' : 'No' }} />;
                },
                isVisible: true,
                headerText: 'Call Later',
                allowCopy: true,
                minWidth: 175
            },
            {
                id: 'willingToProceed',
                accessor: 'callsList.0.willingnessToProceed',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return <DataCell cell={{ value: value ?? 'NA' }} />;
                },
                isVisible: true,
                headerText: 'Willing to Proceed',
                allowCopy: true,
                minWidth: 175
            },
            {
                id: 'nextSteps',
                accessor: 'callsList.0.nextSteps',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return (
                        <DataCell
                            cell={{ value: value?.length ? value : 'NA' }}
                        />
                    );
                },
                isVisible: true,
                headerText: 'Next Steps',
                allowCopy: true,
                minWidth: 175
            },
            {
                id: 'concerns',
                accessor: 'callsList.0.concerns',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return (
                        <DataCell
                            cell={{ value: value?.length ? value : 'NA' }}
                        />
                    );
                },
                isVisible: true,
                headerText: 'Concerns',
                allowCopy: true,
                minWidth: 175
            },
            {
                id: 'followUpPoints',
                accessor: 'callsList.0.followupPoints',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return (
                        <DataCell
                            cell={{ value: value?.length ? value : 'NA' }}
                        />
                    );
                },
                isVisible: true,
                headerText: 'Follow Up Points',
                allowCopy: true,
                minWidth: 175
            },
            {
                id: 'transcript',
                accessor: 'callsList.0.transcript',
                Header: HeaderCell,
                headerText: 'Transcript',
                isVisible: true,
                minWidth: 175,
                Cell: TranscriptCell
            },
            {
                id: 'recordingUrl',
                accessor: 'callsList.0.recordingUrl',
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
    }, [handleSort, setTableFilters, sort, statusOptions, tableFilters]);

    return columns;
};
