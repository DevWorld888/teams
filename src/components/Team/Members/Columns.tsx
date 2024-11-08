import { ColumnDef } from "@tanstack/react-table"
import { Member } from ".."
import {useHelpers} from "@/hooks/useHelpers"
import Roles from "./Options/Roles"
import { Badge } from "@/components/ui/badge"
import Options from "./Options"
import { supabase } from "@/lib/supebase"
import { toast } from "sonner"


export const columns:ColumnDef<Member>[]=[
    {
        accessorKey:'name',
        header:'Name',
        cell: ({ row }) => {
            const name:string= row.getValue("name")
            const email:string = row.original.email
       
            return <div className="flex items-center gap-2">
                <div className="flex items-center justify-center bg-black text-white font-bold capitalize w-8 h-8 rounded-full">
                    {name[0]}
                </div>
                <div className="grid">
                    <span className="font-medium">{name}</span>
                    <span className="text-xs text-neutral-500">{email}</span>
                </div>
            </div>
        },
    },
    {
        accessorKey:'role',
        header:'Role',
        cell: ({ row }) => {
            console.log(row.original)
            const {open,setLoading,setOpen} = useHelpers()
            const role:string = row.getValue('role')
            const rowdata: string = row.original
            console.log('viii',rowdata.id)

            const onRoleChanged = async (v: string) => {
                
              try {
                setLoading(true);
                const { data } = await supabase
                  .from('team_member')
                  .update({
                    role: v
                  })
                  .eq("id",'62917689-8adc-4af0-b1d2-cdb3c260049b')
                  .select('*');

                //   const { data, error } = await supabase
                //   .from('team_member')
                //   .update({ role: 'xxx' })
                //   .eq('id', '1')
                //   .select()
                
      
                if (data && data.length > 0) {
                    console.log('esito',data)
                  toast.success("Role updated successfully")
                }
              } catch (error: any) {
                throw new Error(error);
              } finally {
                setOpen(false);
                setLoading(false);
              }
            };
            return <div className="w-[120px]" onClick={()=> setOpen(!open)}>
                {!open && <span className="text-sm text-neutral-500 capitalize">{role}</span>}
                {open && <Roles {...{selected:role}} setSelected={(v)=>onRoleChanged(v)}/>}   
            </div>
        },
    },
    {
        accessorKey:'status',
        header:'Status',
        cell: ({ row }) => {
            const status:string= row.getValue("status")
            switch (status) {
                case 'Pending':
                    return <Badge className="hover:bg-transparent capitalize bg-orange-50 text-orange-900">Pending</Badge>
                case 'Active':
                    return <Badge className="hover:bg-transparent capitalize bg-green-50 text-green-900">Active</Badge>
                case 'Removed':
                    return <Badge className="hover:bg-transparent capitalize bg-red-50 text-red-900">Removed</Badge>
                default:
                    return <Badge className="hover:bg-transparent capitalize bg-neutral-100 text-neutral-600">Unknown</Badge>
              
            }
        },
    },
    {
        id:'actions',
        cell: ({ row }) => {
            const user = row.original
            return <div className="flex justify-end">
                <Options {...{user}}/>
            </div>
        },
    }

]