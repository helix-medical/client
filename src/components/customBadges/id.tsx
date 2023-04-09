import { Badge } from '@mantine/core';

const IdBadge = ({ id }: { id: string }): JSX.Element => {
    return (
        <Badge color="gray" variant="dot" size="md">
            {id}
        </Badge>
    );
};

export default IdBadge;