"use client"

import Link from "next/link";
import { Menu } from "lucide-react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger
} from "@/components/ui/menubar";

export default function NavigationMenu() {

    return (
        <Menubar className="border-0 w-0">
            <MenubarMenu>
                <MenubarTrigger>
                    <Menu />
                </MenubarTrigger>
                <MenubarContent>
                    <Link href="/project-list">
                        <MenubarItem>
                            List
                        </MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    <Link href="/project-creation">
                        <MenubarItem>
                            Creation
                        </MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    <Link href="/project">
                        <MenubarItem>
                            Management
                        </MenubarItem>
                    </Link>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                D3v0ps
            </MenubarMenu>
        </Menubar>
    );
}