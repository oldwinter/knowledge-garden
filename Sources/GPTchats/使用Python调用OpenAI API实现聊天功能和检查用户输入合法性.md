---
system_commands: ['I am a helpful assistant.']
temperature: 0
top_p: 1
max_tokens: 300
presence_penalty: 1
frequency_penalty: 1
stream: true
stop: null
n: 1
model: gpt-3.5-turbo
---
用python语言，调用openai api，实现chat功能。


<hr class="__chatgpt_plugin">

role::assistant

好的，以下是一个简单的Python代码示例，用于调用OpenAI API实现聊天功能：

首先，你需要安装openai模块。可以使用以下命令进行安装：

```
pip install openai
```

然后，在你的代码中导入openai模块，并设置API密钥和引擎ID。

```python
import openai

# 设置API密钥
openai.api_key = "YOUR_API_KEY"

# 设置引擎ID（这里以davinci为例）
engine_id = "davinci"
```

接下来，定义一个函数来与OpenAI API交互并获取回复。

```python
def ask_openai(question, engine_id):
    prompt = f"Conversation with OpenAI:\n\nUser: {question}\nOpenAI:"
    response = openai.Completion.create(
        engine=engine_id,
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7,
    )

    message = response.choices[0].text.strip()
    return message
```

最后，在主程序中循环询问用户输入，并调用ask_openai()函数获取回复。

```python
while True:
    user_input = input("You: ")
    
    if user_input.lower()
```

<hr class="__chatgpt_plugin">

role::user

我有多个API密钥，帮我轮询它们。并帮我用moderate接口，检查用户输入内容的合法性。

<hr class="__chatgpt_plugin">

role::assistant

好的，以下是一个Python代码示例，用于轮询多个API密钥，并使用OpenAI API中的moderate接口检查用户输入内容的合法性：

首先，你需要安装openai模块。可以使用以下命令进行安装：

```
pip install openai
```

然后，在你的代码中导入openai模块。

```python
import openai
import random

# 设置API密钥列表和引擎ID（这里以davinci为例）
api_keys = ["YOUR_API_KEY_1", "YOUR_API_KEY_2", "YOUR_API_KEY_3"]
engine_id = "davinci"

# 随机选择一个API密钥并设置为当前活动密钥
active_api_key = random.choice(api_keys)
openai.api_key = active_api_key

# 定义函数来检查用户输入是否合法
def check_input(input_text):
    response = openai.Completion.create(
        engine=engine_id,
        prompt=f"Moderation:\n\n{input_text}\nIs this text appropriate?",
        temperature=0.5,
        max_tokens=1,
        n=1,
        stop=None,
    )

    if response.choices[0].text.strip().lower() == 'yes':
      return True
    
    return False

# 定义
```

<hr class="__chatgpt_plugin">

role::user

