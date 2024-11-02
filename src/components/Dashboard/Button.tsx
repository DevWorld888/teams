'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonRProps {
    id: string | number;
}

const ButtonR: React.FC<ButtonRProps> = ({ id }) => {
    return (
        <Link href={`/team/${id}`}>
            <span>View</span>
        </Link>
    );
}

export default ButtonR;
