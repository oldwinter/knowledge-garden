---
PromptInfo:
 promptId: ligCinematic
 name: 🖼️ Generate a Cinematic Lighting photo 
 description: Movie-like imagery with dramatic shadowing and very strong vibrancy, it also seems to add sun rays whenever it can.
 author: Prompt Engineering Guide
 tags: photo, dalle-2, lighting
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
{{selection}}, Cinematic Lighting