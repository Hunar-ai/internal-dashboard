import React from 'react';

import {
    Column,
    Cell,
    HeaderCell,
    DataCell,
    DataLinkCell,
    ColumnActionsPopOver,
    BaseColumns
} from '@components/common';
import { CallStatusCell } from '@components/playgroundMetrics';
import { CallLanguageCell } from '@components/nehaSelect/CallLanguageCell';

import { useTableFilters } from 'hooks/useTableFilters';
import { SettingsContext } from 'contexts';

import type {
    DateFilterTypeMapProps,
    HandleSortProps,
    Sort,
    TableFiltersProps
} from 'interfaces';
import { COLUMN_STICKY_TYPE, FILTER_TYPE, SORT_TYPE } from 'Enum';
import { TimeUtils } from 'utils';

export interface NehaSelectColumnsProps {
    tableFilters: TableFiltersProps;
    dateFilterTypeMap: DateFilterTypeMapProps;
    sort?: Sort;
    setTableFilters: (_: TableFiltersProps) => void;
    setDateFilterTypeMap: (_: DateFilterTypeMapProps) => void;
    handleSort: HandleSortProps;
}

export const NehaAgentsColumns = ({
    tableFilters,
    dateFilterTypeMap,
    sort,
    setTableFilters,
    setDateFilterTypeMap,
    handleSort
}: NehaSelectColumnsProps) => {
    const { formFields } = React.useContext(SettingsContext);

    const { statusOptions, callLanguageOptions } = useTableFilters(formFields);

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
                id: 'companyName',
                accessor: 'lead.companyId',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Company ID',
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
                id: 'duration',
                accessor: 'duration',
                Header: HeaderCell,
                isVisible: true,
                headerText: 'Duration',
                minWidth: 225,
                Filter: ColumnActionsPopOver,
                Cell: ({ value }: Cell) => {
                    const seconds = (value ?? 0) * 60;
                    const formattedSeconds = TimeUtils.formatSeconds(seconds);
                    return <DataCell cell={{ value: formattedSeconds }} />;
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
                id: 'language',
                accessor: 'language',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return <CallLanguageCell callLanguage={value} />;
                },
                isVisible: true,
                headerText: 'Call Language',
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
                        options: callLanguageOptions,
                        filters: {
                            tableFilters,
                            setTableFilters,
                            hideBlanks: true
                        }
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
            ...new BaseColumns({
                sort,
                handleSort,
                tableFilters,
                setTableFilters,
                dateFilterTypeMap,
                setDateFilterTypeMap
            }).getBaseColumns()
        ];
    }, [
        handleSort,
        setTableFilters,
        sort,
        statusOptions,
        callLanguageOptions,
        dateFilterTypeMap,
        setDateFilterTypeMap,
        tableFilters
    ]);

    return columns;
};
