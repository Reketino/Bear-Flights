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



export async function GET(request: NextRequest) {

}