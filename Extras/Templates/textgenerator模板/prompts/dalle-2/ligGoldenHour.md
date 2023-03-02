---
PromptInfo:
 promptId: ligGoldenHour
 name: 🖼️ Generate a Golden Hour Sunlight photo
 description: The hour just after sunrise or just before sunset when the natural light is soft and warm. Increases the temperature of generations.
 author: Prompt Engineering Guide
 tags: photo, dalle-2,lighting
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
{{selection}}, Golden Hour Sunlight