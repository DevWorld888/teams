'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from '../ui/button';

const ButtonR = () => {
    const router = useRouter();
    const handleNavigation = () => {
        router.push('/team'); // This is where you navigate to another page or component
    };
    return (
        <Button>
            <span onClick={handleNavigation}>Go</span>
        </Button>
    )
}

export default ButtonR
