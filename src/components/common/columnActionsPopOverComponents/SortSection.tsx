import { Grid, Typography, Link } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Check as CheckIcon } from '@mui/icons-material';
import { SORT_ORDER, SORT_TYPE } from 'Enum';
import { type Sort } from 'interfaces';
import { SortAscendingText } from './SortAscendingText';
import { SortDescendingText } from './SortDescendingText';

interface SortSectionProps {
    sortState?: Sort;
    setSortState: (_: Sort) => void;
    id: string;
    sortType: SORT_TYPE;
}

export const SortSection = ({
    id,
    sortState,
    setSortState,
    sortType
}: SortSectionProps) => {
    const onAscClick = () => {
        setSortState({
            key: id,
            order: SORT_ORDER.ASC
        });
    };

    const onDescClick = () => {
        setSortState({
            key: id,
            order: SORT_ORDER.DESC
        });
    };

    return (
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={12} py={0.5} px={2}>
                    <Typography variant="overline" color={grey[700]}>
                        SORT
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        justifyContent="space-between"
                        py={1}
                        px={2}
                        sx={{
                            '&:hover': { bgcolor: grey[100], cursor: 'pointer' }
                        }}
                        onClick={onAscClick}
                    >
                        <Grid item xs={10}>
                            <Link
                                component="button"
                                sx={{
                                    verticalAlign: 'unset',
                                    justifyContent: 'start'
                                }}
                                color="inherit"
                                underline="none"
                            >
                                <Typography variant="body2">
                                    <SortAscendingText sortType={sortType} />
                                </Typography>
                            </Link>
                        </Grid>
                        {sortState?.key === id &&
                            sortState?.order === SORT_ORDER.ASC && (
                                <CheckIcon color="primary" />
                            )}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        justifyContent="space-between"
                        py={1}
                        px={2}
                        sx={{
                            '&:hover': { bgcolor: grey[100], cursor: 'pointer' }
                        }}
                        onClick={onDescClick}
                    >
                        <Grid item xs={10}>
                            <Link
                                component="button"
                                sx={{
                                    verticalAlign: 'unset',
                                    justifyContent: 'start'
                                }}
                                color="inherit"
                                underline="none"
                            >
                                <Typography variant="body2">
                                    <SortDescendingText sortType={sortType} />
                                </Typography>
                            </Link>
                        </Grid>
                        {sortState?.key === id &&
                            sortState?.order === SORT_ORDER.DESC && (
                                <CheckIcon color="primary" />
                            )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
