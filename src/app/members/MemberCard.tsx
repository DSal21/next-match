'use client'

import LikeButton from "@/components/LikeButton"
import { Member } from "@/generated/prisma"
import { calculateAge } from "@/lib/util"
import { Card, CardFooter } from "@heroui/card"
import { Image } from "@heroui/image"
import Link from "next/link"
import React from "react"

type MemberCardProps = {
    member: Member;
    likeIds: string[]
}

export default function MemberCard({ member, likeIds }: MemberCardProps) {

    const hasLiked = likeIds.includes(member.userId);

    function preventLinkAction(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
            <Image isZoomed alt={member.name} width={300} src={member.image || '/images/user.png'} className='aspect-square object-cover' />
            <div onClick={preventLinkAction}>
                <div className="absolute top-3 right-3 z-50">
                    <LikeButton targetId={member.userId} hasLiked={hasLiked} />
                </div>
            </div>
            <CardFooter className='flex justify-start bg-black overflow-hidden absolute bottom-0 z-10' style={{ backgroundColor: 'var(--dark-gradient)' }}>
                <div className="flex flex-col text-white">
                    <span className="font-semibold">{member.name} {calculateAge(member.dateOfBirth)}</span>
                    <span className="text-sm">{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    )
}