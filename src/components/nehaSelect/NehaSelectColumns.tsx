import React from 'react';

import {
    Column,
    Cell,
    HeaderCell,
    DataCell,
    DataLinkCell,
    ColumnActionsPopOver
} from '@components/common';
import { CallStatusCell } from '@components/playgroundMetrics';

import type { HandleSortProps, Sort } from 'interfaces';
import { COLUMN_STICKY_TYPE, SORT_TYPE } from 'Enum';
import { TimeUtils } from 'utils';

export interface NehaSelectColumnsProps {
    sort?: Sort;
    handleSort: HandleSortProps;
}

export const NehaSelectColumns = ({
    sort,
    handleSort
}: NehaSelectColumnsProps) => {
    const columns: Array<Column> = React.useMemo(() => {
        return [
            {
                id: 'name',
                accessor: 'lead.name',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Candidate Name',
                isVisible: true,
                minWidth: 175,
                sticky: COLUMN_STICKY_TYPE.LEFT
            },
            {
                id: 'mobileNumber',
                accessor: 'lead.mobileNumber',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Mobile Number',
                isVisible: true,
                minWidth: 150
            },
            {
                id: 'jobRole',
                accessor: 'lead.jobRole',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Job Role',
                isVisible: true,
                minWidth: 175
            },
            {
                id: 'companyName',
                accessor: 'lead.companyName',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Company Name',
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
                minWidth: 150,
                Filter: ColumnActionsPopOver,
                columnActionsProps: {
                    sortProps: {
                        sort,
                        handleSort,
                        sortType: SORT_TYPE.DEFAULT
                    }
                }
            },
            {
                id: 'language',
                accessor: 'language',
                Header: HeaderCell,
                Cell: DataCell,
                isVisible: true,
                headerText: 'Language',
                minWidth: 135,
                Filter: ColumnActionsPopOver,
                columnActionsProps: {
                    sortProps: {
                        sort,
                        handleSort,
                        sortType: SORT_TYPE.DEFAULT
                    }
                }
            },
            {
                id: 'callLater',
                accessor: 'callLater',
                Header: HeaderCell,
                Cell: DataCell,
                isVisible: true,
                headerText: 'Call Later',
                minWidth: 150,
                Filter: ColumnActionsPopOver,
                columnActionsProps: {
                    sortProps: {
                        sort,
                        handleSort,
                        sortType: SORT_TYPE.DEFAULT
                    }
                }
            },
            {
                id: 'duration',
                accessor: 'duration',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    const seconds = (value ?? 0) * 60;
                    const formattedSeconds = TimeUtils.formatSeconds(seconds);
                    return <DataCell cell={{ value: formattedSeconds }} />;
                },
                isVisible: true,
                headerText: 'Call Duration',
                minWidth: 225,
                Filter: ColumnActionsPopOver,
                columnActionsProps: {
                    sortProps: {
                        sort,
                        handleSort,
                        sortType: SORT_TYPE.NUMERIC
                    }
                }
            },
            {
                id: 'willingnessToProceed',
                accessor: 'willingnessToProceed',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Willing to Proceed',
                minWidth: 225,
                Filter: ColumnActionsPopOver,
                columnActionsProps: {
                    sortProps: {
                        sort,
                        handleSort,
                        sortType: SORT_TYPE.DEFAULT
                    }
                }
            },
            {
                id: 'nextSteps',
                accessor: 'nextSteps',
                Header: HeaderCell,
                Cell: DataCell,
                isVisible: true,
                headerText: 'Next Steps',
                minWidth: 150
            },
            {
                id: 'concerns',
                accessor: 'concerns',
                Header: HeaderCell,
                Cell: DataCell,
                isVisible: true,
                headerText: 'Concerns',
                minWidth: 150
            },
            {
                id: 'followupPoints',
                accessor: 'followupPoints',
                Header: HeaderCell,
                Cell: DataCell,
                isVisible: true,
                headerText: 'Follow Up Points',
                minWidth: 225
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
            }
        ];
    }, [handleSort, sort]);

    return columns;
};
