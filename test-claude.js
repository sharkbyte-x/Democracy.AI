const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

async function testClaude() {
    console.log('Testing Claude 4 API...\n');
    
    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY
    });
    
    // Try Claude 4 models
    const modelsToTry = [
        "claude-sonnet-4-6",
        "claude-sonnet-4-5"
    ];
    
    for (const modelName of modelsToTry) {
        console.log(`Testing: ${modelName}`);
        try {
            const message = await anthropic.messages.create({
                model: modelName,
                max_tokens: 100,
                messages: [{
                    role: "user",
                    content: "Say hello!"
                }]
            });
            
            console.log(`✅ SUCCESS with "${modelName}"!`);
            console.log(`Response: ${message.content[0].text}\n`);
            console.log(`🎉 USE THIS MODEL: "${modelName}"\n`);
            return;
            
        } catch (error) {
            console.log(`❌ Failed: ${error.message}\n`);
        }
    }
}

testClaude();