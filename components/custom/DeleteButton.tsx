import {Button} from "@/components/ui/button";
import {X} from "lucide-react";

type CheckButtonProps = {
    buttonAction: (id: number) => void;
    ID: number;
}

export default function CheckButton({buttonAction, ID}: CheckButtonProps) {


    return (
        <Button
         variant='destructive'
         onClick={() => buttonAction(ID)}>
            <X />
        </Button>
    )
}