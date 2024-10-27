import { useHelpers } from '@/hooks/useHelpers'
import React, { useState } from 'react'
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
 } from '../ui/dialog'
import { Button } from '../ui/button'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Roles from './Members/Options/Roles'
import CustomButton from '../CustomButton'
import { supabase } from '@/lib/supebase'
import { toast } from 'sonner'


export default function NewMember({ team_id }: { team_id: string }) {
  const {open,setOpen,loading,setLoading} = useHelpers()
  const [member,setMember] = useState({
    name:"",
    email:"",
    role:"member"
  })

  
  const saveMember = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_member')
        .insert({ ...member, team_id })
        .select();

      if (data) {
        toast.success("Team members successfully added.")
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>
          <span>New Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New member</DialogTitle>
          <DialogDescription>
            Please enter name and email of member.Click save when you are done
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name'className='text.right  font-bold' ><h4>Name</h4></Label>
              <Input
              id="name"
              placeholder="John Doe"
              defaultValue={member.name}
              className="col-span-3"
              onChange={(e: any) =>
                setMember((prev: any) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='email'className='text.right  font-bold'>Email</Label>
          <Input
              id="email"
              defaultValue={member.email}
              placeholder="johndoe@gmail.com"
              className="col-span-3"
              onChange={(e: any) =>
                setMember((prev: any) => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='role'className='text.right  font-bold'>Select Role</Label>
          <Roles 
            selected={member.role}
            setSelected={(v:string)=>{
                setMember((prev:any)=>({...prev,role:v}))
            }}
          />
          </div>
        </div>
        <DialogFooter>
          <CustomButton {...{label:'Send Invitation',loading,onClick:saveMember}}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
