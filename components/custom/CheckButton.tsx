import {Button} from "@/components/ui/button";
import {CheckIcon} from "lucide-react";

type CheckButtonProps = {
    buttonAction: (id: number) => void;
    ID: number;
}

export default function CheckButton({buttonAction, ID}: CheckButtonProps) {


    return (
        <Button
         variant='secondary'
         onClick={() => buttonAction(ID)}>
            <CheckIcon/>
        </Button>
    )
}