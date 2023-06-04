---
PromptInfo:
 promptId: summarizeBART 
 name: 🪄 Summarize Text using BRAT Facebook
 description: select considered context and run the command 
 author: Noureddine
 tags: huggingface, text, summarization
 version: 0.0.3
config:
 append:
  bodyParams: false  笨蛋    ‘性人’ means ‘love’ in Chinese. ‘’ is the Chinese word for ‘family’ or ‘friend’. “’’ ‘Love’ can mean ‘cordial’ and ‘soul’,’ ’soulmate’ refers to a person who is emotionally and physically close to another person.’
  reqParams: true
 context: 'inputs'
 output: 'requestResults[0]?.summary_text'
bodyParams:
reqParams:
 url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
 headers:
  Authorization: "Bearer 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"
---
{{selection}}
