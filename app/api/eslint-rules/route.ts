import { Linter } from "eslint";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  const page = req.nextUrl.searchParams.get("page") || 1;
  const limit = req.nextUrl.searchParams.get("limit") || 10;

  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);

  if (
    isNaN(parsedPage) ||
    isNaN(parsedLimit) ||
    parsedPage < 1 ||
    parsedLimit < 1
  ) {
    return Response.json(
      {
        error:
          "Invalid query parameters: page and limit must be positive integers",
      },
      { status: 400 }
    );
  }
  try {
    const linter = new Linter();
    const rules = linter.getRules();

    let obj: any = {};

    rules.forEach(function (value, key) {
      obj[key] = value;
    });

    const filteredKeys = Object.keys(obj).filter((key) =>
      key.toLowerCase().includes((query || "").toLowerCase())
    );
    const startIndex = (parsedPage - 1) * parsedLimit;
    const endIndex = startIndex + parsedLimit;
    const slicedResults = filteredKeys
      .slice(startIndex, endIndex)
      .map((key) => ({
        [key]: obj[key],
      }));

    return Response.json({ data: slicedResults });
  } catch (error) {
    console.error("Error fetching ESLint rules:", error);
    return Response.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
