---
PromptInfo:
 promptId: completeTextBloom 
 name: 🪄 Complete Text using Bloom Model
 description: select considered context and run the command 
 author: Noureddine
 tags: huggingface, text, bloom
 version: 0.0.1
config:
 append:
  bodyParams: false
  reqParams: true
 context: 'inputs'
 output: 'requestResults[0]?.generated_text'
bodyParams:
reqParams:
 url: "https://api-inference.huggingface.co/models/bigscience/bloom"
 headers:
  Authorization: "Bearer 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"
---
{{selection}}

