import { SortArrowIcon } from './SortArrowIcon';

import { SORT_TYPE } from 'Enum';

interface SortDescendingTextProps {
    sortType: SORT_TYPE;
}

export const SortDescendingText = ({ sortType }: SortDescendingTextProps) => {
    switch (sortType) {
        case SORT_TYPE.NUMERIC:
            return (
                <>
                    {'Sort Largest '}
                    <SortArrowIcon />
                    {' Smallest'}
                </>
            );
        case SORT_TYPE.DATE:
            return (
                <>
                    {'Sort Newest '}
                    <SortArrowIcon />
                    {' Oldest'}
                </>
            );
        default:
            return (
                <>
                    {'Sort Z '}
                    <SortArrowIcon />
                    {' A'}
                </>
            );
    }
};
