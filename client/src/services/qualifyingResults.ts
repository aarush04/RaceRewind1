export const fetchQualifyingResults = async (lastName: string, year: number) => {
    const response = await fetch(
        `/api/qualifying-results?lastName=${encodeURIComponent(lastName)}&year=${year}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch qualifying results');
    }

    return response.json();
};