"use client"

import { useStoreModal } from "@/hooks/use-store-model"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Store={
    id:string,
    name:string
    userId:string
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
    
}

export default function StoreSwitcher({
    className,
    items=[],
}:StoreSwitcherProps){
    const [open,setOpen]=useState<boolean>(false)
    const storeModal=useStoreModal()
    const params=useParams()
    const router=useRouter()
    const formattedItems=items.map((item)=>({
     label:item.name,
     value:item.id,
    }))
    const activeStore=formattedItems.find((item)=>item.value===params.storeId)
    const onStoreChange=(store:{label:string,value:string})=>{
        setOpen(false)
        router.push(`/${store.value}`)
    }
    return(
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
          size={'sm'}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a store"
            className={cn("w-[200px] justify-between", className)}
          >
            <Store className="mr-2 h-4 w-4" />
            {activeStore?.label}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search store..." />
              <CommandEmpty>No store found.</CommandEmpty>
              <CommandGroup heading="Stores">
                {formattedItems.map((store) => (
                  <CommandItem
                    key={store.value}
                    onSelect={() => onStoreChange(store)}
                    className="text-sm"
                  >
                    <Store className="mr-2 h-4 w-4 cursor-pointer" />
                    {store.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4 ",
                        activeStore?.value === store.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                
                  onSelect={() => {
                    setOpen(false)
                    storeModal.onOpen()
                  }}
                >
                  <PlusCircle className="mr-2 h-5 w-5 cursor-pointer" />
                  Create Store
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
}