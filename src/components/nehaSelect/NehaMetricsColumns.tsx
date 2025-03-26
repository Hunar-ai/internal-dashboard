import React from 'react';

import {
    Column,
    Cell,
    HeaderCell,
    DataCell,
    DataLinkCell
} from '@components/common';
import { ColumnActionsPopOver } from '@components/common/ColumnActionsPopOver';
import {
    CallStatusCell,
    ResultSectionCell
} from '@components/playgroundMetrics';
import { BaseColumns } from '@components/common/BaseColumns';
import { CallLanguageCell } from './CallLanguageCell';
import { CallLaterCell } from './CallLaterCell';
import { WillingnessToProceedCell } from './WillingnessToProceedCell';

import { useTableFilters } from 'hooks/useTableFilters';
import { SettingsContext } from 'contexts';

import type {
    DateFilterTypeMapProps,
    HandleSortProps,
    Sort,
    TableFiltersProps
} from 'interfaces';
import {
    COLUMN_STICKY_TYPE,
    FILTER_TYPE,
    SORT_TYPE,
    CALL_RESULT_SECTION
} from 'Enum';
import { TimeUtils } from 'utils';

export interface NehaMetricsColumnsProps {
    sort?: Sort;
    handleSort: HandleSortProps;
    tableFilters: TableFiltersProps;
    setTableFilters: (_: TableFiltersProps) => void;
    dateFilterTypeMap: DateFilterTypeMapProps;
    setDateFilterTypeMap: (_: DateFilterTypeMapProps) => void;
}

export const NehaMetricsColumns = ({
    sort,
    handleSort,
    tableFilters,
    setTableFilters,
    dateFilterTypeMap,
    setDateFilterTypeMap
}: NehaMetricsColumnsProps) => {
    const { formFields } = React.useContext(SettingsContext);
    const {
        statusOptions,
        willingnessToProceedOptions,
        callLanguageOptions,
        callLaterOptions
    } = useTableFilters(formFields);

    const columns: Array<Column> = React.useMemo(() => {
        return [
            {
                id: 'name',
                accessor: 'lead.name',
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
                id: 'callLater',
                accessor: 'callLater',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return <CallLaterCell callLater={value} />;
                },
                isVisible: true,
                headerText: 'Call Later',
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
                        options: callLaterOptions,
                        filters: {
                            tableFilters,
                            setTableFilters,
                            hideBlanks: true
                        }
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
                allowCopy: true,
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
                Cell: ({ value }: Cell) => {
                    return (
                        <WillingnessToProceedCell
                            willingnessToProceed={value}
                        />
                    );
                },
                isVisible: true,
                headerText: 'Willing to Proceed',
                allowCopy: true,
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
                        options: willingnessToProceedOptions,
                        filters: {
                            tableFilters,
                            setTableFilters,
                            hideBlanks: true
                        }
                    }
                }
            },
            {
                id: 'nextSteps',
                accessor: 'nextSteps',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return (
                        <ResultSectionCell
                            value={value}
                            section={CALL_RESULT_SECTION.NEXT_STEPS}
                        />
                    );
                },
                isVisible: true,
                headerText: 'Next Steps',
                allowCopy: true,
                minWidth: 150
            },
            {
                id: 'concerns',
                accessor: 'concerns',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return (
                        <ResultSectionCell
                            value={value}
                            section={CALL_RESULT_SECTION.CONCERNS}
                        />
                    );
                },
                isVisible: true,
                headerText: 'Concerns',
                allowCopy: true,
                minWidth: 150
            },
            {
                id: 'followupPoints',
                accessor: 'followupPoints',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return (
                        <ResultSectionCell
                            value={value}
                            section={CALL_RESULT_SECTION.FOLLOW_UP_POINTS}
                        />
                    );
                },
                isVisible: true,
                headerText: 'Follow Up Points',
                allowCopy: true,
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
        sort,
        handleSort,
        statusOptions,
        tableFilters,
        setTableFilters,
        callLaterOptions,
        callLanguageOptions,
        willingnessToProceedOptions,
        dateFilterTypeMap,
        setDateFilterTypeMap
    ]);

    return columns;
};
