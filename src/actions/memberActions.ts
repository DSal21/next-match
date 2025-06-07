'use server'
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"



export async function listMembers() {
    const session = await auth();

    if (!session?.user) return null

    try {
        return await prisma.member.findMany({
            where: {
                NOT: {
                    userId: session.user.id
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({
            where: { userId }
        })
    } catch (error) {
        console.log(error);
    }
}

export async function listMemberPhotosByUserId(userId: string) {
    try {
        const photos = await prisma.member.findUnique({
            where: {
                userId
            },
            select: {
                photos: true
            }
        })

        if (!photos) return null

        return photos.photos
    } catch (error) {
        console.log(error)
    }
}