import { listMemberPhotosByUserId } from "@/actions/memberActions";
import { CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";

export default async function PhotosPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params
    const photos = await listMemberPhotosByUserId(userId);
    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Photos
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="grid grid-cols-5 gap-3">
                    {photos && photos.map(photo => <Image key={photo.id} src={photo.url} alt='User photo' width={300} className='object-cover aspect-square' />)}
                </div>
            </CardBody>
        </>
    )
}