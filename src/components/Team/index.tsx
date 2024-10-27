"use client"
import React, { useCallback, useEffect } from 'react'
import { useState } from "react";

import { DataTable } from '../DataTable';
import { columns } from './Members/Columns';
import NewMember from './New';
import { useHelpers } from '@/hooks/useHelpers';
import { supabase } from '@/lib/supebase';
import clsx from 'clsx';
import LoadingTeam from '../Loading/Team';

// Define the TypeScript type for a Member
export type Member = {
  name: string;
  email: string;
  role: string;
  status: string;
};

const TeamComponent = () => {
  const [team, setTeam] = useState({
    id: '9f384537-b2b1-4f1b-9391-8ad430f7f264'
  })
  const [members, setMembers] = useState<Member[]>([]);
  const { loading, setLoading } = useHelpers()

  const fetchTeam = useCallback(
    async () => {
      try {
        setLoading(true)
        const { data } = await supabase.from("teams").select().eq("id", "9f384537-b2b1-4f1b-9391-8ad430f7f264");
        console.log(data)

        if (data) {

          const m = await supabase
            .from("team_member")  // Assuming 'members' is the correct table name
            .select("*")      // Select all fields, or specify the fields you need
            .eq("team_id", "9f384537-b2b1-4f1b-9391-8ad430f7f264");
          console.log('member', m)
          setMembers(m.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    },
    [setLoading],
  )

  useEffect(() => {
    fetchTeam()
    const channels = supabase.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'team_member' },
        (payload) => {
          console.log('Change received!', payload)
          fetchTeam()
        }
      )
      .subscribe()

  }, [fetchTeam, team])

  if(loading) return <LoadingTeam/>

  return (
    <div className='grid gap-0 border rounded-lg shadow px-5 py-4 w-full max-w-[800px]'>
      <header className='flex items-start justify-between'>
        <div className='grid gap-1'>
          <h1 className='text-2xl'>Team</h1>
          <p>Invite new members in your team</p>
        </div>
        <NewMember team_id={team.id} />
      </header>
      <main>
        <DataTable columns={columns} data={members} />
      </main>
    </div>
  )
}

export default TeamComponent
