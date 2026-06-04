import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RestaurantPage() {

    return (
        <>
            <div>Restaurant Page</div>
            店铺名：

            <Input value="test" />
            <Button>保存</Button>
        </>
    )
}