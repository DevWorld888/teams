import { ColumnDef } from "@tanstack/react-table"

import { Teams } from "./Dashboard"
import { Button } from "../ui/button"
import { Router } from "next/router"
import { useRouter } from "next/navigation"
import ButtonR from "./Button"



export const columns: ColumnDef<Teams>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => {
            const id: string = row.getValue("id")


            return <div className="flex items-center gap-2">

                <div className="grid">
                    <span className="font-medium">{id}</span>
                </div>
            </div>
        },
    },

    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const name: string = row.getValue("name")


            return <div className="flex items-center gap-2">

                <div className="grid">
                    <span className="font-medium">{name}</span>
                </div>
            </div>
        },
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ }) => {
            
            return <div className="flex items-center gap-2">
                <ButtonR/>
            </div>
        },
    },


]