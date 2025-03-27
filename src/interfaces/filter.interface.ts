import { DATE_FILTER_TYPE } from '@hunar.ai/hunar-design-system';
import { FILTER_TYPE, SORT_TYPE } from 'Enum';
import { OptionsProps } from './option.interface';
import { HandleSortProps, Sort } from './table.interface';

export interface DateFilterStateProps {
    startDate?: string | null;
    endDate?: string | null;
}

export type MultiSelectFilterKeyProps =
    | 'status'
    | 'willingnessToProceed'
    | 'callLanguage'
    | 'callLater';

export type DateRangeFilterKeyProps = 'createdAt' | 'updatedAt';
export type FilterKeyProps =
    | MultiSelectFilterKeyProps
    | DateRangeFilterKeyProps;

export type MultiSelectFiltersProps = Partial<
    Record<MultiSelectFilterKeyProps, string[]>
>;
export type DateRangeFiltersProps = Partial<
    Record<DateRangeFilterKeyProps, DateFilterStateProps>
>;
export type TableFiltersProps = Partial<
    MultiSelectFiltersProps & DateRangeFiltersProps
>;

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
            dateFilterTypeMap?: DateFilterTypeMapProps;
            hideBlanks?: boolean;
            setTableFilters: (_: TableFiltersProps) => void;
            setDateFilterTypeMap?: (_: DateFilterTypeMapProps) => void;
        };
    };
}

export interface ColumnFilterProps {
    column: {
        columnActionsProps: ColumnActionsProps;
        id: FilterKeyProps;
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

export interface DateFilterTypeMapProps {
    [key: string]: DATE_FILTER_TYPE;
}
