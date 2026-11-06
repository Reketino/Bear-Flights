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
}

async function searchAircraftImage(
    query: string,
): Promise<AircraftImage | null> {
    return null;
}

export async function GET(request: NextRequest) {

}