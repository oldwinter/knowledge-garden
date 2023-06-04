---
PromptInfo:
 promptId: modAwardWinning
 name: 🖼️ Generate a Award-Winning Art photo 
 description: Images in the dataset with captions like “Award-Winning Art” are usually extremely creative and original, so using this modifier can greatly improve the quality and inventiveness of your generations.
 author: Prompt Engineering Guide
 tags: photo, dalle-2, modifier
 version: 0.0.1
config:
 append:
  bodyParams: false
  reqParams: true
 context: "prompt"
 output: '`\n![](${requestResults.data[0].url})`'
bodyParams:
 n: 1
 size: "1024x1024"
reqParams:
 url: "https://api.openai.com/v1/images/generations"
---
{{selection}}, Award-Winning Art