interface Driver {
    name: string;
    image: string;
    team: string;
    country: string;
}

export const drivers: Driver[] = [
    {
        name: "Lewis Hamilton",
        image: "https://cdn-2.motorsport.com/images/mgl/YEQ1pGwY/s800/lewis-hamilton-mercedes.jpg",
        team: "Mercedes",
        country: "United Kingdom",
    },
    {
        name: "Max Verstappen",
        image: "https://example.com/max-verstappen.jpg",
        team: "Red Bull Racing",
        country: "Netherlands",
    },
    {
        name: "Sebastian Vettel",
        image: "https://example.com/sebastian-vettel.jpg",
        team: "Aston Martin",
        country: "Germany",
    },
    {
        name: "Charles Leclerc",
        image: "https://example.com/charles-leclerc.jpg",
        team: "Ferrari",
        country: "Monaco",
    },
    {
        name: "Lando Norris",
        image: "https://example.com/lando-norris.jpg",
        team: "McLaren",
        country: "United Kingdom",
    },
];
