"use client";
import createURL from "@/lib/createURL";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function URLForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [error, setError] = useState("");
    const [siteAddress, setSiteAddress] = useState("");

    useEffect(() => {
        setSiteAddress(window.location.origin + "/");
    }, []);

    return (
        <form
            className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 font-mono text-gray-900"
            onSubmit={(event) => {
                event.preventDefault();
                setNewUrl("");
                setError("");

                createURL(alias, url)
                    .then((result) => {
                        if (typeof result === "string") {
                            setError(result);
                        } else {
                            setNewUrl(siteAddress + encodeURIComponent(result.alias));
                        }
                    })
                    .catch(() => {
                        setError("Could not save your link. Please try again.");
                    });
            }}
        >
            <TextField
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%" }}
                label="Original URL"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <label htmlFor="alias" className="mt-4 block">
                Custom Alias
            </label>

            <div className="flex flex-wrap items-center gap-2">
                <span className="break-all text-gray-600">{siteAddress}</span>

                <TextField
                    id="alias"
                    variant="outlined"
                    size="small"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                />
            </div>

            <div className="w-full flex justify-center">
                <Button
                    type="submit"
                    variant="contained"
                >
                    Shorten
                </Button>
            </div>

            {newUrl && <a href={newUrl}>{newUrl}</a>}
            {error && <p role="alert">{error}</p>}
        </form>
    );
}