'use client'

import { NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
    href: string;
    label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {

    const pathname = usePathname();

    return (
        <NavbarItem isActive={pathname === href} as={Link} href={href}>{label}</NavbarItem>
    )
}