import { error } from "console";
import { Vault } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

type WikimediaPage = {
    title?: string;
    imageinfo?: {
        descriptionurl: any;
        descriptionUrl: any;
        thumburl?: string;
        extmetadata?: {
            LicenseShortName?: {
                value?: string;
            };
        };
    }[];
};

type WikimediaResponse = {
    query?: {
        pages?: Record<string, WikimediaPage>;
    };
};

type AircraftImage = {
    imageUrl: string;
    sourceUrl: string;
    title:  string;
    license: string | null;
};

async function searchAircraftImage(
    query: string,
): Promise<AircraftImage | null> {
    const params = new URLSearchParams({
        action: "query",
        generator: "search",
        gsrsearch: query,
        gsrnamespace: "6",
        gsrlimit: "5",
        prop: "imageinfo",
        liprop: "url|extmetdata",
        liurlwidth: "1200",
        format: "json",
        origin: "*", 
    });

    const response = await fetch(
        `https://commons.wikimedia.org/w/api.php?${params.toString()}`,
        {
            headers: {
                "User-Afent": "BearFlights/1.0 (aircraft image lookup)",
            },
            next: {
                revalidate: 86400,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Wikimedia image search failed.");
    }

    const data = (await response.json()) as WikimediaResponse;
    const pages = Object.values(data.query?.pages ?? {});

    for (const page of pages) {
        const image = page.imageinfo?.[0];

        if (!image?.thumburl || !image.descriptionurl) {
            continue;
        }

        return {
            imageUrl: image.thumburl,
            sourceUrl: image.descriptionurl,
            title: page.title ?? "Aircraft image",
            license:
            image.extmetadata?.LicenseShortName?.value ?? null,
        };
        
    }
    
    return null;
}

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const model = searchParams.get("model")?.trim();
    const manufacturer = searchParams.get("manufacturer")?.trim();
    const typecode = searchParams.get("typecode")?.trim();

    const clean = (value?: string | null) =>
        value?.replace(/[^\p{L}\p{N}\s.-]/gu, "").slice(0, 100).trim() ?? "";

    const safeModel = clean(model);
    const safeManufacturer = clean(manufacturer);
    const safeTypecode = clean(typecode);

    if (!safeModel && !safeTypecode) {
        return NextResponse.json(
            { error: "No aircraft model provided" },
            { status: 400 },
        );
    }
    
    const searches = [
        safeManufacturer && safeModel
        ? `"${safeManufacturer} ${safeModel}" aircraft`
        : null,
        safeModel ? `"${safeModel}" aircraft` : null,
    ]
    

}