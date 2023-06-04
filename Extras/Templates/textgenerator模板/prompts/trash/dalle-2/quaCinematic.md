---
PromptInfo:
 promptId: quaCinematic
 name: 🖼️ Generate a cinematic movie photo
 description: Adds a very atmospheric movie-like feel to the image, with great color tones and image composure, and can also add nice background blur and pretty camera angles.
 author: Prompt Engineering Guide
 tags: photo, dalle-2,quality
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
{{selection}}, Cinematic Movie Photograph