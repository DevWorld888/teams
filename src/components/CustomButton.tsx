import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

const CustomButton = ({
    label,
    variant = "default",
    loading,
    onClick
}:{
    label:string,
    variant?:any,
    loading:boolean,
    onClick:()=>any

}) => {
    if(loading) return <Button variant={'outline'} disabled>
        <Loader2 className='animate-spin'/>
    </Button>
  return <Button variant={variant} onClick={()=>onClick()}>{label}</Button>
}

export default CustomButton
