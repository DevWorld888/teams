import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Roles = ({
    selected='member',setSelected}:
    {selected:string;setSelected?:(value:string)=>void}
) => {
    const roles = [
        'admin',
        'manager',
        'member'
    ]
    return (
        <div>
            <Select defaultValue={selected} onValueChange={setSelected}>
                <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        {
                            roles.map((r)=>(
                                <SelectItem value={r} key={r}>{r}</SelectItem>
                            ))
                        }                     
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Roles
