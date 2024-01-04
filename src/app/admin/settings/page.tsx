import LeadText from "@/components/leadText";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
export default function Page() {
    return (
        <div className="mt-6 flex flex-col gap-2">
            <LeadText>Ustawienia</LeadText>
            <Drawer>
                <DrawerTrigger>Open</DrawerTrigger>
                <DrawerContent className="">
                    <DrawerHeader>
                        <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <button>Submit</button>
                        <DrawerClose>
                            <button >Cancel</button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}