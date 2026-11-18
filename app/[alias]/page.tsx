"use client";
import getURL from "@/lib/getURL";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function AliasRedirect() {
    const { alias } = useParams<{ alias: string }>();
    const router = useRouter();

    useEffect(() => {
        getURL(alias)
            .then((url) => {
                if (url) {
                    router.replace(url);
                }
            })
            .catch((err) => console.error(err));
    }, [alias, router]);

    return null;
}

export default function AliasPage() {
    return (
        <Suspense fallback={<p>Opening your link...</p>}>
            <AliasRedirect />
        </Suspense>
    );
}