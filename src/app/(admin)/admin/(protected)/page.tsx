import Mike from "@/app/(admin)/admin/(protected)/dashboard/Mike";
import TestComponent from "@/app/(admin)/admin/(protected)/dashboard/TestComponent";

export default function AdminPage() {

    return (
        <>
            <div>i am admin page</div>
            {/* 只有在非import的代码区（如作为HTML标签）的时候才有智能提示，直接在import处写代码没有智能提示,
            AI 也建议没必要纠结import的智能提示，因为没必要自己写import，因为自己import还会出错 */}
            <TestComponent />
            <Mike />
        </>
    )
}