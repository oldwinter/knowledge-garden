---
PromptInfo:
 promptId: classify-bart-large-mnli 
 name: 🪄 classify using bart-large-mnli
 description: You need to specify candidate_labels
 author: Noureddine
 tags: huggingface, text, classification
 version: 0.0.1
config:
 append:
  bodyParams: false
  reqParams: true
 context: 'inputs'
 output: "`\n==${requestResults.labels[0]}==`"
bodyParams:
 parameters:
  candidate_labels: ["refund", "legal", "faq"]
reqParams:
 url: "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"
 headers:
  Authorization: "Bearer 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"
---
{{selection}}