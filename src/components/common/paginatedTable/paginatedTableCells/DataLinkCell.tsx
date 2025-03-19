import { Link, Typography } from '@mui/material';

interface DataCellProps {
    link: string;
    text: string;
}

export const DataLinkCell = ({ link, text }: DataCellProps) => {
    if (!link?.trim()) return <></>;

    return (
        <Link target="_blank" href={link} underline="hover">
            <Typography variant="body2" noWrap>
                {text}
            </Typography>
        </Link>
    );
};
