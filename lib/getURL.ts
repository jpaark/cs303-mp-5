"use server";

import getCollection, { URL_COLLECTION } from "@/db";

export default async function getURL(alias: string): Promise<string | null> {
    const urlsCollection = await getCollection(URL_COLLECTION);
    const savedURL = await urlsCollection.findOne({ alias: alias });

    if (!savedURL || typeof savedURL.url !== "string") {
        return null;
    }

    if (!savedURL.url.startsWith("https://") && !savedURL.url.startsWith("http://")) {
        return null;
    }

    return savedURL.url;
}