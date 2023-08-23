---
title: ∑ OpenAI 官方文档阅读笔记
date created: 2023-03-05
date modified: 2023-03-15
---

## 核心概念

- prompts
	- [[chatGPT Prompts]]
- tokens
	- 给定API请求中处理的令牌数量取决于输入和输出的长度。根据粗略的经验，对于英文文本，1个令牌大约是4个字符或0.75个单词。要记住的一个限制是，文本提示和生成的补全的总和不能超过模型的最大上下文长度(对于大多数模型，这是2048个令牌，或大约1500个单词)。
	- 实际上gpt-4支持8k以上的token，gpt-3.5也支持4k以内的token。
	- [Chat completion - OpenAI API](https://platform.openai.com/docs/guides/chat/managing-tokens)
- modules
	- GPT-4
	- GPT-3.5-Turbo
	- [[DALL·E]]
	- Whisper
	- Embeddings
	- Codex
	- Moderation
		- 审核模型旨在检查内容是否符合OpenAI的使用策略。这些模型提供了分类功能，可以在以下类别中查找内容：仇恨、仇恨/威胁、自残、性、性/未成年人、暴力和暴力/图形。
	- GPT-3
		- text-davinci-003
		- ada
		- Babbage
		- curie

## openai api的能力范围

在本快速入门教程中，您将构建一个简单的样例应用程序。在此过程中，您将学习使用API执行任何任务所需的关键概念和技术，包括：

- Content generation 内容生成
- Summarization 摘要
- Classification, categorization, and sentiment analysis  
    分类、分类和情感分析
- Data extraction 数据抽取
- Translation 翻译
- Many more! 更多！

## 模型功能

### chat或者说completion

chat相比于原来的completing，最大特点，就是prompt传入数组，之前是单个字符串。

```json
[
  {"role": "system", "content": "You are a helpful assistant that translates English to French."},
  {"role": "user", "content": 'Translate the following English text to French: "{text}"'}
]
```


### embedding

[[embedding 接口调试笔记]]

### moderate
对某个语句，获取其涉及不和谐部分的评估信息。这个接口完全免费，可以拿来做用户评论信息的过滤等等。

```python
threaten = "你不听我的我就拿刀砍死你"

def moderation(text):
    response = openai.Moderation.create(
        input=text
    )
    output = response["results"][0]
    return output
print(moderation(threaten))
```


```jsonpython
threaten = "你不听我的我就拿刀砍死你"

def moderation(text):
    response = openai.Moderation.create(
        input=text
    )
    output = response["results"][0]
    return output
print(moderation(threaten))
```


```
{
  "categories": {
    "hate": false,
    "hate/threatening": false,
    "self-harm": false,
    "sexual": false,
    "sexual/minors": false,
    "violence": true,
    "violence/graphic": false
  },
  "category_scores": {
    "hate": 0.030033664777874947,
    "hate/threatening": 0.0002820899826474488,
    "self-harm": 0.004850226454436779,
    "sexual": 2.2907377569936216e-05,
    "sexual/minors": 6.477687275463495e-09,
    "violence": 0.9996402263641357,
    "violence/graphic": 4.35576839663554e-05
  },
  "flagged": true
}
```

## 核心入参

chat功能的api入参[API Reference - OpenAI API --API参考-OpenAI API](https://platform.openai.com/docs/api-reference/chat)

- model
- messages
	- `"messages": [{"role": "user", "content": "Hello!"}]`
- temperature，默认1
	- 范围：0-2
	- 含义：0则结果几乎不变，1则结果多变。0就是接近[[幂等]]。
	- 引申：就是置信度和开放度，0则稳定可信，1则多变发散。
- top_p ，默认1
	- 范围：未知
	- An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
	- 和temperatue只能改1个。
	- 含义：还看不太懂，后期改改看理解一下。
- max_tokens
	- 影响返回内容，可以理解为，当让gpt写小作文还是大作文，即使问题一样，他写出来的也可能完全不同。
- n，默认1
	- 生成多少条回复
- stream，默认false
- presence_penalty，默认0
	- Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics. -
	- 介于-2.0和2.0之间的数字。正值根据新词（token）到目前为止是否出现在文本中来惩罚它们，**从而增加了模型讨论新主题的可能性**。
- frequency_penalty，默认0
	- Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.  
	- 介于-2.0和2.0之间的数字。到目前为止，正值根据新标记在文本中的现有频率来惩罚它们，从而**降低了模型逐字重复相同行的可能性**。越大越能说用新的词语表达同一个意思，越小越容易车轱辘话。
- [API Reference - OpenAI API](https://platform.openai.com/docs/api-reference/parameter-details)


## 参考
[GitHub - easychen/openai-gpt-dev-notes-for-cn-developer: 如何快速开发一个OpenAI/GPT应用：国内开发者笔记](https://github.com/easychen/openai-gpt-dev-notes-for-cn-developer)

[ChatGPT 指令大全](https://www.explainthis.io/zh-hans/chatgpt)