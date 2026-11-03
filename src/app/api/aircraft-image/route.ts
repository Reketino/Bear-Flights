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

export async function GET(request: NextRequest) {

}