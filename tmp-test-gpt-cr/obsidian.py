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

## 4.pinecone初始化
import pinecone
import os
# PINECONE_API_KEY="d0e32935-ca46-4a82-be38-34cc17dbdcce"
# PINECONE_ENV="gcp-starter"

# initialize pinecone

pinecone.init(
    api_key=os.getenv('PINECONE_API_KEY'),  # find at app.pinecone.io
    environment=os.getenv('PINECONE_ENV'),  # next to api key in console
)

index_name = "ingtube-test"

if index_name not in pinecone.list_indexes():
    pinecone.create_index(
      name=index_name,
      metric='cosine',
      dimension=1536  
)


# 将documents按照每16个元素为一组进行分割
chunks = [documents[i:i + 16] for i in range(0, len(documents), 16)]

from langchain.vectorstores import Pinecone
## 5.循环调用Pinecone.from_documents方法，从embedding接口生成数据，同时存储向量数据至pinecone
for chunk in chunks:
    Pinecone.from_documents(chunk, embeddings, index_name=index_name)

