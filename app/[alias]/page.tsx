"use client";
import getURL from "@/lib/getURL";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AliasPage() {
    const { alias } = useParams<{ alias: string }>();
    const router = useRouter();
    const [message, setMessage] = useState("Opening your link...");

    useEffect(() => {
        getURL(alias)
            .then((url) => {
                if (url) {
                    router.replace(url);
                } else {
                    setMessage("This short link could not be found.");
                }
            })
            .catch(() => {
                setMessage("Could not open this link. Please try again.");
            });
    }, [alias, router]);

    return <p>{message}</p>;
}