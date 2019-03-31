const lastUpdated = new Date();
const lastUpdatedOptions = {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};
const lastUpdatedString = lastUpdated.toLocaleString('en-US', lastUpdatedOptions);

const config = {
    title: 'Nicolas Hollmann | Github.io',
    user: 'nhollmann',
    author: 'Nicolas Hollmann',
    description: 'Nicolas Hollmann\'s GitHub repositories.',
    keywords: 'Nicolas Hollmann, GitHub, Repsoitories',
    lastUpdated: lastUpdatedString,
};

export default config;
