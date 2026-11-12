import { NextRequest, NextResponse } from "next/server";

type WikimediaPage = {
    title?: string;
    imageinfo?: {
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
    
    return null;
}

export async function GET(request: NextRequest) {

}