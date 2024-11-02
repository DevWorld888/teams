'use client';
import TeamComponent from '@/components/Team';
import React from 'react';


interface TeamProps {
    params: {
        teamid: string;
    };
}
const Team: React.FC<TeamProps> = ({ params }) => {
    console.log('params',params)
    return (
        <div className="flex items-center justify-center m-4">
            <TeamComponent id={params.teamid} />
        </div>
    );
}

export default Team;
