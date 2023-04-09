[Midjourney Quick Start Guide](https://docs.midjourney.com/docs/quick-start)

- u按钮，放大图像，生成所选图像的较大版本，并生成更多细节，比如可以更改提示词，加参数等。
- v按钮，对所选图像进行微调。生成的新图像，整体样式和构图，会和所选图像类似。

fast mode每月有一定配额，会单独分配GPU，快速给我们画图，基本几秒钟就画出来。relax mode就是慢很多了，而且它有算法，用的越频繁，后面的响应时间越久，甚至长达10分钟。

## prompt

### 高级 prompt
- 最前面可以放图片url
- 中间放描述文本
- 最后面放参数

### 语法
4版本之前，不太能理解句子，所以看到都是很多单词组成，5版本现在对句子的理解能力也非常强了，可以使用句子。

### 专注自己想要，用--no 参数排除不想要
--no参数能保证某个对象不在最终图像中。


### 多角度细节化描述
**Try to be clear about any context or details that are important to you. Think about:  
尽量弄清楚对你来说重要的任何背景或细节。想一想：**


-   **Subject:** person, animal, character, location, object, etc.  
    主体：人、动物、人物、地点、客体等。
-   **Medium:** photo, painting, illustration, sculpture, doodle, tapestry, etc.  
    媒介：摄影、绘画、插图、雕塑、涂鸦、挂毯等。
-   **Environment:** indoors, outdoors, on the moon, in Narnia, underwater, the Emerald City, etc.  
    环境：室内、户外、月球、纳尼亚、水下、翡翠城等。
-   **Lighting:** soft, ambient, overcast, neon, studio lights, etc  
    照明：柔和、环境、阴天、霓虹灯、工作室灯等
-   **Color:** vibrant, muted, bright, monochromatic, colorful, black and white, pastel, etc.  
    颜色：鲜艳、柔和、明亮、单色、彩色、黑白、粉色等。
-   **Mood:** Sedate, calm, raucous, energetic, etc.  
    情绪：沉稳、平静、喧闹、精力充沛等。
-   **Composition:** Portrait, headshot, closeup, birds-eye view, etc.  
    构图：肖像、头像、特写、鸟瞰等。

### 具体化
比如三只猫比猫更具体，鸟群比鸟更具体。

## prompt 的风格

### 指定风格
比如油漆画、国画、素描、像素风等等，有几十上百种风格。
[[midjourney 指定风格列表]]

### 具体描述风格
素描，就可以分为 很多种类型
![image.png](https://img.oldwinter.top/202304051443096.png)
prompt example: `/imagine prompt` `<style> sketch of a cat`
实例：`/imagine prompt Continuous Line，sketch a fish `
![image.png](https://img.oldwinter.top/202304051449377.png)


### 时代风格
比如1700年代，1950年代，都有不同的风格。
prompt example: `/imagine prompt` `<decade> cat illustration`

### 用情感词

happy，shy，angry等等

### 用色彩描述词
millennial pink，千禧一代粉色

### 环境描述
不同环境可以设置独特的情绪。
mountain，desert等。

## blend 合并图片

## settings命令设置模型版本、图像生成质量等。
也可以直接通过prompt的参数设置，如 
- `--v 5`就代表使用模型版本5，也是目前最新。`--niji` 则是二次元风格
- `--q 2`代表质量，2是高质量，1是基本质量。
- `--s 250`代表样式，250是高样式。也就是settings里面的style。样式的意思是：艺术化（色彩、构图、形式）的程度。

### parameters参数列表

随时查：[Midjourney Parameter List](https://docs.midjourney.com/docs/parameter-list)
常见：
- q，v，s
- `--ar`：长宽比，如3:1 
- `--no`：排除某个东西，比如`--no plants`，生成图像中不要有植物。
- `--chaos`：越大，越随机，越发散，生成的4张选图差别就越大
- `--seed`：指定相同的seed值和prompt提示词，将更可能产生类似的最终图片。也就是通过设置seed，可以让相同提示词每次生成的图像更稳定，不那么随机和发散。⭐️，通过✉️符号，可以知道
	- 通过生成图片的右上角，给一个信封emoji反应，机器人会私信我们这个图片的jobid和seed值。
- `--tile`：生成分块的磁贴。相当于小图像的平铺模式。
- `--video`：生成动图，现在版本5不支持，得用版本3及之前。



## upscalers升级
模型4及之前，每次生成图像，会提供各种相关，让我们升级图像。现在模型5，直接提供的1024✖️1024，也不支持upscalers。

## prompt高级玩法
### 提供我们的图片做为prompt
![image.png](https://img.oldwinter.top/202304071658749.png)
参数
- `--iw`，越大，提供的图的影响越高。范围是.5-2。
### remix 混音或再混合模式
开启后，中途可以用命令改变其prompt或参数。也就是点击variation按钮，此时会弹窗让我们修改prompt。

### multi prompts
主要解决hot dog被识别成热狗，还是很热的狗这种问题。以及解决狗和热这2个提示词的权重。
![image.png](https://img.oldwinter.top/202304071708557.png)

### permutation prompts
相当于批量脚本。用复用句子，将句子中某个对象或者说词语，做为变量，指定为某n个值，这样同时生成n个结果。如果fast mode配额用完，处于relax mode了，就不能用了。
Batch jobs are only available on standard and pro plans, with fast mode enabled.