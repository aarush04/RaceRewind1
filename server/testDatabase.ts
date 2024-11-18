import { getPitStopAverages } from './src/services/database';

async function testQuery() {
    const grandPrixName = 'Monaco Grand Prix'; // Replace with your test Grand Prix name
    try {
        console.log(`Fetching pit stop averages for: ${grandPrixName}`);
        const results = await getPitStopAverages(grandPrixName);
        console.log('Query Results:', results);
    } catch (error) {
        console.error('Error fetching pit stop averages:', error);
    } finally {
        process.exit(); // Exit the process after the test is complete
    }
}

testQuery();
