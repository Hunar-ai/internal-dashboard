import { SortArrowIcon } from './SortArrowIcon';

import { SORT_TYPE } from 'Enum';

interface SortAscendingTextProps {
    sortType: SORT_TYPE;
}

export const SortAscendingText = ({ sortType }: SortAscendingTextProps) => {
    switch (sortType) {
        case SORT_TYPE.NUMERIC:
            return (
                <>
                    {'Sort Smallest '}
                    <SortArrowIcon />
                    {' Largest'}
                </>
            );
        case SORT_TYPE.DATE:
            return (
                <>
                    {'Sort Oldest '}
                    <SortArrowIcon />
                    {' Newest'}
                </>
            );
        default:
            return (
                <>
                    {'Sort A '}
                    <SortArrowIcon />
                    {' Z'}
                </>
            );
    }
};
