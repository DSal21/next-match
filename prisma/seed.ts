import { PrismaClient } from "../src/generated/prisma/client";
import { membersData } from "./membersData";
import { hashSync } from "bcryptjs";

const db = new PrismaClient();

async function seedMembers() {
    return membersData.map(async (member) => {
        await db.user.create({
            data: {
                email: member.email,
                emailVerified: new Date(),
                name: member.name,
                passwordHash: hashSync('password', 10),
                image: member.image,
                member: {
                    create: {
                        dateOfBirth: new Date(member.dateOfBirth),
                        gender: member.gender,
                        name: member.name,
                        description: member.description,
                        city: member.city,
                        country: member.country,
                        image: member.image,
                        createdAt: new Date(member.created),
                        updatedAt: new Date(member.lastActive),
                        photos: {
                            create: {
                                url: member.image
                            }
                        }
                    }
                }
            }
        })
    })
}

async function main() {
    await seedMembers();
};

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(async () => {
    await db.$disconnect()
})