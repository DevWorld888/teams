'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { DataTable } from '../DataTable'
import { supabase } from '@/lib/supebase';
import { columns } from './Columns';

export type Teams = {
    id: string;
    name: string;
  };

const Dashboard = () => {
    const [teams, setTeams] = useState<Teams[]>([]);
    const fetchTeam = useCallback(
        async () => {
          try {
            const { data } = await supabase.from("teams").select()
            console.log(data)
            if(data){
                setTeams(data)
            }
          } catch (error) {
            console.log(error)
          } finally {
            // setLoading(false)
          }
        },
        [],
      )

      useEffect(() => {
        fetchTeam()
      }, [])
 
    return (
        <>
            <div className='grid gap-0 border rounded-lg shadow px-5 py-4 w-full max-w-[800px]'>
                <header className='flex items-start justify-between'>
                    <div className='grid gap-1'>
                        <h1 className='text-2xl'>Teams</h1>
                        <p>List of teams</p>
                    </div>
                </header>
                <main>
                    <DataTable columns={columns} data={teams} />
                </main>
            </div>
        </>
    )
}

export default Dashboard