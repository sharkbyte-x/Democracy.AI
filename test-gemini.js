const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGemini() {
    console.log('Testing Gemini API...');
    console.log('API Key loaded?', process.env.GEMINI_API_KEY ? 'YES' : 'NO');
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try more model variations
    const modelsToTry = [
        "gemini-1.0-pro",
        "models/gemini-1.0-pro",
        "gemini-1.5-flash",
        "models/gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "models/gemini-1.5-pro",
        "gemini-pro",
        "models/gemini-pro"
    ];
    
    for (const modelName of modelsToTry) {
        console.log(`\n--- Testing: ${modelName} ---`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello in one sentence!");
            const text = result.response.text();
            
            console.log(`✅ SUCCESS with "${modelName}"!`);
            console.log(`Response: ${text}`);
            console.log(`\n🎉🎉🎉 USE THIS MODEL NAME IN server.js: "${modelName}" 🎉🎉🎉\n`);
            return; // Stop after first success
            
        } catch (error) {
            console.log(`❌ Failed`);
            console.log(`Error: ${error.message.substring(0, 150)}`);
        }
    }
    
    console.log('\n❌ None of the models worked.');
    console.log('\nPossible issues:');
    console.log('1. API key might be restricted');
    console.log('2. Generative Language API might not be enabled');
    console.log('3. Your region might not support these models yet');
}

testGemini();