'use server'

import { prisma } from "@/lib/prisma";
import { getUserId } from "./authActions";
import { Member } from "@/generated/prisma";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean): Promise<void> {
    try {
        const userId = await getUserId();

        if (isLiked) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId
                    }
                }
            })
        } else {
            await prisma.like.create({
                data: {
                    sourceUserId: userId,
                    targetUserId
                }
            })
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function listUserLikes(): Promise<string[]> {
    try {
        const userId = await getUserId();

        const likes = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetUserId: true
            }
        })

        return likes.map(({ targetUserId }) => targetUserId)
    } catch (error) {
        console.log(error);
        throw error
    }

}

export async function listLikedMembers(type = 'source') {
    try {
        const userId = await getUserId();

        switch (type) {
            case 'source':
                return await fetchSourceLikes(userId);

            case 'target':
                return await fetchTargetLikes(userId);

            case 'mutual':
                return await fetchMutualLikes(userId);

            default:
                return [];
        }
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong.')
    }
}

async function fetchSourceLikes(userId: string): Promise<Member[]> {
    try {
        const sourceList = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: { targetMember: true }
        })

        return sourceList.map(x => x.targetMember)
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong.')
    }
}

async function fetchTargetLikes(userId: string): Promise<Member[]> {
    try {
        const targetList = await prisma.like.findMany({
            where: {
                targetUserId: userId
            },
            select: {
                sourceMember: true
            }
        })

        return targetList.map(x => x.sourceMember)
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong.')
    }
}

async function fetchMutualLikes(userId: string): Promise<Member[]> {
    try {
        const likedUsers = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetUserId: true
            }
        })
        const likedUserIds = likedUsers.map(x => x.targetUserId);

        const mutualLikes = await prisma.like.findMany({
            where: {
                AND: [
                    {
                        sourceUserId: {
                            in: likedUserIds
                        }
                    },
                    { targetUserId: userId }
                ]
            },
            select: { sourceMember: true }
        });

        return mutualLikes.map(x => x.sourceMember)
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong.')
    }
}