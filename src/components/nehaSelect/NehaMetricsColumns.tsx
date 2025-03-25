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
                minWidth: 150
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
                accessor: 'callsCount',
                Header: HeaderCell,
                Cell: DataCell,
                headerText: 'Calls Count',
                isVisible: true,
                minWidth: 150
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
                id: 'language',
                accessor: 'callsList.0.language',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return <CallLanguageCell callLanguage={value} />;
                },
                isVisible: true,
                headerText: 'Language',
                allowCopy: true,
                minWidth: 135,
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
                id: 'callLater',
                accessor: 'callsList.0.callLater',
                Header: HeaderCell,
                Cell: ({ value }: Cell) => {
                    return <CallLaterCell callLater={value} />;
                },
                isVisible: true,
                headerText: 'Call Later',
                allowCopy: true,
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
                id: 'duration',
                accessor: 'callsList.0.duration',
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
                    },
                    filterProps: {
                        filterType: FILTER_TYPE.RANGE,
                        filters: {
                            tableFilters,
                            setTableFilters,
                            hideBlanks: true
                        }
                    }
                }
            },
            {
                id: 'willingnessToProceed',
                accessor: 'callsList.0.willingnessToProceed',
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
                accessor: 'callsList.0.nextSteps',
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
                accessor: 'callsList.0.concerns',
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
                id: 'followUpPoints',
                accessor: 'callsList.0.followupPoints',
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
        willingnessToProceedOptions,
        callLanguageOptions,
        callLaterOptions,
        dateFilterTypeMap,
        setDateFilterTypeMap,
        tableFilters
    ]);

    return columns;
};
