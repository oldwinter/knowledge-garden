## 1.终端里设置环境变量

# export OPENAI_API_TYPE=azure
# export OPENAI_API_VERSION=2023-05-15
# export OPENAI_API_BASE=https://ingtubeopenai.openai.azure.com
# export OPENAI_API_KEY=ea31775d794e47beb2f6cd479817ce81

# export PINECONE_API_KEY=d0e32935-ca46-4a82-be38-34cc17dbdcce
# export PINECONE_ENV=gcp-starter

## 2.加载原始csv数据

# llm(documents1[0].page_content)


from langchain.document_loaders import ObsidianLoader

loader = ObsidianLoader("/Users/yingtu/知识库/ingtube")
documents = loader.load()

## 3.embddings对象模型初始化，实际调用在后面。
from langchain.embeddings import OpenAIEmbeddings
embeddings = OpenAIEmbeddings(
    client="",
    model="text-embedding-ada-002",
    deployment="ingtube-ada",
    # input="texts",
    # chunk_size=1
    show_progress_bar=True,
)
