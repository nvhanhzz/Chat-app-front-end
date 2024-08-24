import React, { useState } from 'react';
import { Button, Popover } from 'antd';

const Test: React.FC = () => {
    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <Popover
            content={<a onClick={hide}>Close</a>}
            title="Title"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <Button type="primary">Click me</Button>
        </Popover>
    );
};

export default Test;