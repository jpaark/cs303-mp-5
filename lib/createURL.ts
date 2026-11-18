"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { URLProps } from "@/types";

export default async function createURL(
    alias: string,
    url: string,
): Promise<URLProps> {
    console.log("creating new URL");

    const u = {
        alias: alias,
        url: url,
    };

    const urlsCollection = await getCollection(URL_COLLECTION);
    const existingURL = await urlsCollection.findOne({ alias: alias });

    if (existingURL) {
        throw new Error("This alias is already taken");
    }

    const res = await urlsCollection.insertOne({ ...u });

    if (!res.acknowledged) {
        throw new Error("Db insert failed");
    }

    return { ...u };
}