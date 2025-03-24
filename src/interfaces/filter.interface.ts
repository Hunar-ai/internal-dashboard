import { FILTER_TYPE, SORT_TYPE } from 'Enum';
import { OptionsProps } from './option.interface';
import { HandleSortProps, Sort } from './table.interface';

export interface DateFilterStateProps {
    startDate?: Date | string | null;
    endDate?: Date | string | null;
}

export interface TableFiltersProps {
    createdAt?: DateFilterStateProps;
    status?: string[];
}

export type FilterKeyProps = 'createdAt' | 'status';

export type MultiSelectFilterKeyProps = 'status';

export type DateRangeFilterKeyProps = 'createdAt';

export interface ColumnActionsProps {
    sortProps: {
        sort?: Sort;
        handleSort: HandleSortProps;
        sortType?: SORT_TYPE;
    };
    filterProps?: {
        filterType?: FILTER_TYPE;
        keyword?: string;
        options?: OptionsProps;
        filters: {
            tableFilters: TableFiltersProps;
            setTableFilters: (_: TableFiltersProps) => void;
            hideBlanks?: boolean;
        };
    };
}

export interface ColumnFilterProps {
    column: {
        columnActionsProps: ColumnActionsProps;
        id: 'status' | 'createdAt';
    };
}

export type Unit = 'days' | 'months' | 'years';

interface DateRangeFilterDate {
    period: number;
    unit?: Unit;
}

export interface DateRangeFilterOptionProps {
    [key: string]: {
        label: string;
        value: string;
        extraProps: {
            startDate: DateRangeFilterDate;
            endDate: DateRangeFilterDate;
        };
    };
}
