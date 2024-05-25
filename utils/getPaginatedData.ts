export default function getPaginatedData({
  data,
  query = "",
  page = 1,
  limit = 10,
}: {
  data: any;
  page?: number;
  limit?: number;
  query?: string;
}) {
  try {
    const filteredKeys = Object.keys(data).filter((key) =>
      key.toLowerCase().includes((query || "").toLowerCase())
    );
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const slicedResults = filteredKeys
      .slice(startIndex, endIndex)
      .map((key) => ({
        [key]: data[key],
      }));

    return { data: slicedResults };
  } catch (error) {
    console.error("Error fetching ESLint rules:", error);
    return { data: [] };
  }
}
