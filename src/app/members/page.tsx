import { listMembers } from "@/actions/memberActions";
import MemberCard from "./MemberCard";
import { listUserLikes } from "@/actions/likeActions";

export default async function MembersPage() {

    const members = await listMembers();
    const likes = await listUserLikes();

    return (
        <div className='mt-10 grid grid-cols-2 mdgrid-cols-3 xl:grid-cols-6 gap-8'>
            {members && members.map(member => (
                <MemberCard member={member} key={member.id} likeIds={likes} />
            ))}
        </div>
    )
}