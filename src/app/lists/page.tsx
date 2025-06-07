
import { listLikedMembers, listUserLikes } from "@/actions/likeActions";
import ListsTab from "./ListsTab";

export default async function ListsPage({ searchParams }: { searchParams: Promise<{ type: string }> }) {
    const { type } = await searchParams;

    const members = await listLikedMembers(type)
    const likeIds = await listUserLikes();

    return (
        <div>
            <ListsTab members={members} likeIds={likeIds} />
        </div>
    )
}