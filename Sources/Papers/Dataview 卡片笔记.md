---
date created: 2022-08-19
date modified: 2022-08-20
metatable: true
searchCodepro0: i
searchCodepro1: a
searchCodepro2: a
searchCodepro3: t
searchColor: All
searchTag: 
searchText: 
searchType: tags
title: Dataview 卡片笔记
---

```dataviewjs
let vaultpath = "";
const metaeditEnabled = app.plugins.enabledPlugins.has("metaedit");
const buttonEnabled = app.plugins.enabledPlugins.has("buttons");
const thisFile = dv.pages().where(f => f.file.path == dv.current().file.path)
let searchType = dv.current().searchType;
let searchColor = dv.current().searchColor;
let searchTag = dv.current().searchTag;
let searchCodepro0 = dv.current().searchCodepro0;
let searchCodepro1 = dv.current().searchCodepro1;
let searchCodepro2 = dv.current().searchCodepro2;
let searchCodepro3 = dv.current().searchCodepro3;
let searchText = dv.current().searchText;
var sQuery = ""
var sCode = ""
if (metaeditEnabled === true && buttonEnabled === true) {

    const { update } = this.app.plugins.plugins["metaedit"].api;
    const searchTypeDropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const optionsText = ["标签", "注释", "图库", "文本", "高级"];
        const optionsValue = ["tags", "color", "image", "searchText", "searchpro"]
        const dropdown = this.container.createEl('select');
        const option1 = dropdown.createEl('option');
        option1.text = optionsText[0];
        option1.value = optionsValue[0];
        const option2 = dropdown.createEl('option');
        option2.text = optionsText[1];
        option2.value = optionsValue[1];
        const option3 = dropdown.createEl('option');
        option3.text = optionsText[2];
        option3.value = optionsValue[2];
        const option4 = dropdown.createEl('option');
        option4.text = optionsText[3];
        option4.value = optionsValue[3];
        const option5 = dropdown.createEl('option');
        option5.text = optionsText[4];
        option5.value = optionsValue[4];
        dropdown.selectedIndex != null ? dropdown.selectedIndex = optionsValue.indexOf(searchType) : dropdown.selectedIndex = 0;
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, optionsValue[dropdown.selectedIndex], file)
        })
        return dropdown
    }
    const searchColorDropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const optionsText = ["全色", "红色", "黄色", "蓝色", "绿色", "紫色"];
        const optionsValue = ["All", "ff6666", "ffd400", "2ea8e5", "5fb236", "a28ae5"]
        const dropdown = this.container.createEl('select');
        const option1 = dropdown.createEl('option');
        option1.text = optionsText[0];
        option1.value = optionsValue[0];
        const option2 = dropdown.createEl('option');
        option2.text = optionsText[1];
        option2.value = optionsValue[1];
        const option3 = dropdown.createEl('option');
        option3.text = optionsText[2];
        option3.value = optionsValue[2];
        const option4 = dropdown.createEl('option');
        option4.text = optionsText[3];
        option4.value = optionsValue[3];
        const option5 = dropdown.createEl('option');
        option5.text = optionsText[4];
        option5.value = optionsValue[4];
        const option6 = dropdown.createEl('option');
        option6.text = optionsText[5];
        option6.value = optionsValue[5];
        dropdown.selectedIndex != null ?
            dropdown.selectedIndex = optionsValue.indexOf(searchColor) : dropdown.selectedIndex = 0;
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, optionsValue[dropdown.selectedIndex], file)
        })
        return dropdown
    }
    const searchCodepro1DropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const optionsText = ["全色", "红色", "黄色", "蓝色", "绿色", "紫色"];
        const optionsValue = ["a", "r", "y", "b", "g", "p"]
        const dropdown = this.container.createEl('select');
        const option1 = dropdown.createEl('option');
        option1.text = optionsText[0];
        option1.value = optionsValue[0];
        const option2 = dropdown.createEl('option');
        option2.text = optionsText[1];
        option2.value = optionsValue[1];
        const option3 = dropdown.createEl('option');
        option3.text = optionsText[2];
        option3.value = optionsValue[2];
        const option4 = dropdown.createEl('option');
        option4.text = optionsText[3];
        option4.value = optionsValue[3];
        const option5 = dropdown.createEl('option');
        option5.text = optionsText[4];
        option5.value = optionsValue[4];
        const option6 = dropdown.createEl('option');
        option6.text = optionsText[5];
        option6.value = optionsValue[5];
        dropdown.selectedIndex != null ? dropdown.selectedIndex = optionsValue.indexOf(searchCodepro1) : dropdown.selectedIndex = 0;
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, optionsValue[dropdown.selectedIndex], file)
        })
        return dropdown
    }
    const searchCodepro2DropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const optionsText = ["全色", "红色", "黄色", "蓝色", "绿色", "紫色"];
        const optionsValue = ["a", "r", "y", "b", "g", "p"]
        const dropdown = this.container.createEl('select');
        const option1 = dropdown.createEl('option');
        option1.text = optionsText[0];
        option1.value = optionsValue[0];
        const option2 = dropdown.createEl('option');
        option2.text = optionsText[1];
        option2.value = optionsValue[1];
        const option3 = dropdown.createEl('option');
        option3.text = optionsText[2];
        option3.value = optionsValue[2];
        const option4 = dropdown.createEl('option');
        option4.text = optionsText[3];
        option4.value = optionsValue[3];
        const option5 = dropdown.createEl('option');
        option5.text = optionsText[4];
        option5.value = optionsValue[4];
        const option6 = dropdown.createEl('option');
        option6.text = optionsText[5];
        option6.value = optionsValue[5];
        dropdown.selectedIndex != null ? dropdown.selectedIndex = optionsValue.indexOf(searchCodepro2) : dropdown.selectedIndex = 0;
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, optionsValue[dropdown.selectedIndex], file)
        })
        return dropdown
    }
    const searchCodepro3DropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const optionsText = ["图", "标签"];
        const optionsValue = ["i", "t"]
        const dropdown = this.container.createEl('select');
        const option1 = dropdown.createEl('option');
        option1.text = optionsText[0];
        option1.value = optionsValue[0];
        const option2 = dropdown.createEl('option');
        option2.text = optionsText[1];
        option2.value = optionsValue[1];
        dropdown.selectedIndex != null ? dropdown.selectedIndex = optionsValue.indexOf(searchCodepro3) : dropdown.selectedIndex = 0;
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, optionsValue[dropdown.selectedIndex], file)
        })
        return dropdown
    }
    const searchCodepro0DropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const optionsText = ["图", "注释", "标签"];
        const optionsValue = ["i", "n", "t"]
        const dropdown = this.container.createEl('select');
        const option1 = dropdown.createEl('option');
        option1.text = optionsText[0];
        option1.value = optionsValue[0];
        const option2 = dropdown.createEl('option');
        option2.text = optionsText[1];
        option2.value = optionsValue[1];
        const option3 = dropdown.createEl('option');
        option3.text = optionsText[2];
        option3.value = optionsValue[2];
        dropdown.selectedIndex != null ? dropdown.selectedIndex = optionsValue.indexOf(searchCodepro0) : dropdown.selectedIndex = 0;
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, optionsValue[dropdown.selectedIndex], file)
        })
        return dropdown
    }
    const tagsDropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const arr = dv.pages().filter(t => t.file.path.includes(vaultpath)).file.tags
        const tags = Array.from(new Set(arr)).filter(t => t.includes("📝/")).sort()
        tags.unshift("#")
        const dropdown = this.container.createEl('select');
        tags.forEach((tag, index) => {
            var opt = tag;
            var el = dropdown.createEl('option');
            opt != "#" ? el.textContent = opt : el.textContent = "全部注释标签";
            el.value = opt;
            dropdown.appendChild(el);
        })
        tags.indexOf("#" + searchTag) < 0 ? dropdown.selectedIndex = 0 : dropdown.selectedIndex = tags.indexOf("#" + searchTag)
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, tags[dropdown.selectedIndex].slice(1), file)
        })
        return dropdown
    }
    const tag1DropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const arr = dv.pages().filter(t => t.file.path.includes(vaultpath)).file.tags
        const tags = Array.from(new Set(arr)).filter(t => t.includes("📝/")).sort()
        tags.unshift("#")
        const dropdown = this.container.createEl('select');
        tags.forEach((tag, index) => {
            var opt = tag;
            var el = dropdown.createEl('option');
            opt != "#" ? el.textContent = opt : el.textContent = "全部注释标签";
            el.value = opt;
            dropdown.appendChild(el);
        })
        tags.indexOf("#" + searchCodepro1) < 0 ? dropdown.selectedIndex = 0 : dropdown.selectedIndex = tags.indexOf("#" + searchCodepro1)
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, tags[dropdown.selectedIndex].slice(1), file)
        })
        return dropdown
    }
    const tag2DropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const arr = dv.pages().filter(t => t.file.path.includes(vaultpath)).file.tags
        const tags = Array.from(new Set(arr)).filter(t => t.includes("📝/")).sort()
        tags.unshift("#")
        const dropdown = this.container.createEl('select');
        tags.forEach((tag, index) => {
            var opt = tag;
            var el = dropdown.createEl('option');
            opt != "#" ? el.textContent = opt : el.textContent = "全部注释标签";
            el.value = opt;
            dropdown.appendChild(el);
        })
        tags.indexOf("#" + searchCodepro2) < 0 ? dropdown.selectedIndex = 0 : dropdown.selectedIndex = tags.indexOf("#" + searchCodepro2)
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, tags[dropdown.selectedIndex].slice(1), file)
        })
        return dropdown
    }
    dv.paragraph("## 检索路径为: " + vaultpath)
    dv.paragraph("## 检索类型: ")
    dv.paragraph(searchTypeDropdownMaker('searchType', dv.current().file.path))
    if (searchType === "color" || searchType === "tags" || searchType === "image") {
        dv.paragraph("## 选项: ")
    }
    if (searchType === "tags") {
        dv.paragraph(tagsDropdownMaker('searchTag', dv.current().file.path));
    } else if (searchType === "color") {
        dv.paragraph(searchColorDropdownMaker('searchColor', dv.current().file.path));
    } else if (searchType === "image") {
        dv.paragraph(searchColorDropdownMaker('searchColor', dv.current().file.path));
    } else if (searchType === "searchText") {
        dv.paragraph(
            `\`\`\`button
name 输入/清空文本
type command
action MetaEdit: Run MetaEdit
\`\`\``)
        dv.paragraph("当前检索文本为：【" + dv.current().searchText + "】")

    } else if (searchType === "searchpro") {
        dv.paragraph("### 进阶选择")
        dv.paragraph("#### 基础类型")
        dv.paragraph(searchCodepro0DropdownMaker('searchCodepro0', dv.current().file.path));
        if (searchCodepro0 == "n") {
            dv.paragraph("#### 注释颜色")
            dv.paragraph(searchCodepro1DropdownMaker('searchCodepro1', dv.current().file.path));
        } else if (searchCodepro0 == "i") {
            dv.paragraph("#### 图片颜色")
            dv.paragraph(searchCodepro1DropdownMaker('searchCodepro1', dv.current().file.path));
        } else if (searchCodepro0 == "t") {
            dv.paragraph("#### 选择标签")
            dv.paragraph(tag1DropdownMaker('searchCodepro1', dv.current().file.path));
        } else {
            dv.paragraph("--->【请选择支持的选项组合】<---")
        }
        dv.paragraph("#### 附加类型")
        dv.paragraph(searchCodepro3DropdownMaker('searchCodepro3', dv.current().file.path));
        if (searchCodepro0 == "t" && searchCodepro3 == "t") {
            dv.paragraph("#### 选择标签")
            dv.paragraph(tag2DropdownMaker('searchCodepro2', dv.current().file.path));
        } else if (searchCodepro0 != "t" && searchCodepro3 == "t") {
            dv.paragraph("#### 选择标签")
            dv.paragraph(tagsDropdownMaker('searchTag', dv.current().file.path));
        } else if (searchCodepro3 == "i") {
            dv.paragraph("#### 图片颜色")
            dv.paragraph(searchCodepro2DropdownMaker('searchCodepro2', dv.current().file.path));
        }
    } else {
        dv.paragraph("--->【请选择支持的选项组合】<---")
    }
    if (searchType == "searchText" && searchText !=null) { var sQuery = 'line.includes("' + dv.current().searchText + '")&&line.includes("> <span class=")' }

    if (searchType == "color") {
        if (dv.current().searchColor == "All") {
            var sQuery = 'line.includes("background-color: #")'
        } else {
            var sQuery = 'line.includes("background-color: #' + dv.current().searchColor + '")'
        }
    }
    if (searchType == "image") {
        if (dv.current().searchColor == "All") {
            var sQuery = 'line.includes("image#")'
        } else {
            var sQuery = 'line.includes("image#' + dv.current().searchColor + '")'
        }
    }
    if (searchType == "tags") {
        if (dv.current().searchTag == null) {
            var sQuery = 'line.includes("🏷️ #📝")&&line.includes("span class=")'
        } else {
            var sQuery = 'line.includes("#' + dv.current().searchTag + '")&&line.includes("span class=")'
        }
    }

    if (searchType == "searchpro") {
        if (searchCodepro0 == "n" && searchCodepro1 == "r" && searchCodepro2 == "a" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#")';
            sCode = '当前检索条件为: </br>同时显示红色注释和全色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "y" && searchCodepro2 == "a" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#")';
            sCode = '当前检索条件为: </br>同时显示黄色注释和全色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "g" && searchCodepro2 == "a" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#")';
            sCode = '当前检索条件为: </br>同时显示绿色注释和全色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "b" && searchCodepro2 == "a" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#")';
            sCode = '当前检索条件为: </br>同时显示蓝色注释和全色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "r" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#ff6666")';
            sCode = '当前检索条件为: </br>同时显示红色注释和红色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "r" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#ffd400")';
            sCode = '当前检索条件为: </br>同时显示红色注释和黄色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "r" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#5fb236")';
            sCode = '当前检索条件为: </br>同时显示红色注释和绿色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "r" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#2ea8e5")';
            sCode = '当前检索条件为: </br>同时显示红色注释和蓝色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "y" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#ff6666")';
            sCode = '当前检索条件为: </br>同时显示黄色注释和红色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "y" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#ffd400")';
            sCode = '当前检索条件为: </br>同时显示黄色注释和黄色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "y" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#5fb236")';
            sCode = '当前检索条件为: </br>同时显示黄色注释和绿色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "y" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#2ea8e5")';
            sCode = '当前检索条件为: </br>同时显示黄色注释和蓝色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "g" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#ff6666")';
            sCode = '当前检索条件为: </br>同时显示绿色注释和红色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "g" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#ffd400")';
            sCode = '当前检索条件为: </br>同时显示绿色注释和黄色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "g" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#5fb236")';
            sCode = '当前检索条件为: </br>同时显示绿色注释和绿色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "g" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#2ea8e5")';
            sCode = '当前检索条件为: </br>同时显示绿色注释和蓝色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "b" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#ff6666")';
            sCode = '当前检索条件为: </br>同时显示蓝色注释和红色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "b" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#ffd400")';
            sCode = '当前检索条件为: </br>同时显示蓝色注释和黄色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "b" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#5fb236")';
            sCode = '当前检索条件为: </br>同时显示蓝色注释和绿色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "b" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#2ea8e5")';
            sCode = '当前检索条件为: </br>同时显示蓝色注释和蓝色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "a" && searchCodepro2 == "a" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #")||line.includes("image#")';
            sCode = '当前检索条件为: </br>同时显示全色注释和全色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "a" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #")||line.includes("image#ff6666")';
            sCode = '当前检索条件为: </br>同时显示全色注释和红色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "a" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #")||line.includes("image#ffd400")';
            sCode = '当前检索条件为: </br>同时显示全色注释和黄色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "a" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #")||line.includes("image#5fb236")';
            sCode = '当前检索条件为: </br>同时显示全色注释和绿色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "a" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #")||line.includes("image#2ea8e5")';
            sCode = '当前检索条件为: </br>同时显示全色注释和蓝色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "p" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#ff6666")';
            sCode = '当前检索条件为: </br>同时显示紫色注释和红色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "p" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#ffd400")';
            sCode = '当前检索条件为: </br>同时显示紫色注释和黄色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "p" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#5fb236")';
            sCode = '当前检索条件为: </br>同时显示紫色注释和绿色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "p" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#2ea8e5")';
            sCode = '当前检索条件为: </br>同时显示紫色注释和蓝色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "p" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#a28ae5")';
            sCode = '当前检索条件为: </br>同时显示紫色注释和紫色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "r" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ff6666")||line.includes("image#a28ae5")';
            sCode = '当前检索条件为: </br>同时显示红色注释和紫色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "y" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #ffd400")||line.includes("image#a28ae5")';
            sCode = '当前检索条件为: </br>同时显示黄色注释和紫色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "g" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #5fb236")||line.includes("image#a28ae5")';
            sCode = '当前检索条件为: </br>同时显示绿色注释和紫色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "b" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("image#a28ae5")';
            sCode = '当前检索条件为: </br>同时显示蓝色注释和紫色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "a" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #")||line.includes("image#a28ae5")';
            sCode = '当前检索条件为: </br>同时显示全色注释和紫色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "p" && searchCodepro2 == "a" && searchCodepro3 == "i") {
            sQuery = 'line.includes("background-color: #a28ae5")||line.includes("image#")';
            sCode = '当前检索条件为: </br>同时显示紫色注释和全色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "r" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#ff6666")||line.includes("image#ff6666")';
            sCode = '当前检索条件为: </br>红色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "y" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#ffd400")||line.includes("image#ff6667")';
            sCode = '当前检索条件为: </br>同时显示黄色图和红色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "g" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#5fb236")||line.includes("image#ff6668")';
            sCode = '当前检索条件为: </br>同时显示绿色图和红色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "b" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#2ea8e5")||line.includes("image#ff6669")';
            sCode = '当前检索条件为: </br>同时显示蓝色图和红色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "p" && searchCodepro2 == "r" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#a28ae5")||line.includes("image#ff6670")';
            sCode = '当前检索条件为: </br>同时显示紫色图和红色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "r" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#ff6666")||line.includes("image#ffd400")';
            sCode = '当前检索条件为: </br>同时显示红色图和黄色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "y" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#ffd400")||line.includes("image#ffd401")';
            sCode = '当前检索条件为: </br>黄色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "g" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#5fb236")||line.includes("image#ffd402")';
            sCode = '当前检索条件为: </br>同时显示绿色图和黄色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "b" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#2ea8e5")||line.includes("image#ffd403")';
            sCode = '当前检索条件为: </br>同时显示蓝色图和黄色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "p" && searchCodepro2 == "y" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#a28ae5")||line.includes("image#ffd404")';
            sCode = '当前检索条件为: </br>同时显示紫色图和黄色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "r" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#ff6666")||line.includes("image#5fb236")';
            sCode = '当前检索条件为: </br>同时显示红色图和绿色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "y" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#ffd400")||line.includes("image#5fb237")';
            sCode = '当前检索条件为: </br>同时显示黄色图和绿色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "g" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#5fb236")||line.includes("image#5fb238")';
            sCode = '当前检索条件为: </br>绿色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "b" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#2ea8e5")||line.includes("image#5fb239")';
            sCode = '当前检索条件为: </br>同时显示蓝色图和绿色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "p" && searchCodepro2 == "g" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#a28ae5")||line.includes("image#5fb240")';
            sCode = '当前检索条件为: </br>同时显示紫色图和绿色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "r" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#ff6666")||line.includes("image#2ea8e5")';
            sCode = '当前检索条件为: </br>同时显示红色图和蓝色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "y" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#ffd400")||line.includes("image#2ea8e6")';
            sCode = '当前检索条件为: </br>同时显示黄色图和蓝色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "g" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#5fb236")||line.includes("image#2ea8e7")';
            sCode = '当前检索条件为: </br>同时显示绿色图和蓝色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "b" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#2ea8e5")||line.includes("image#2ea8e8")';
            sCode = '当前检索条件为: </br>蓝色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "p" && searchCodepro2 == "b" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#a28ae5")||line.includes("image#2ea8e9")';
            sCode = '当前检索条件为: </br>同时显示紫色图和蓝色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "r" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#ff6666")||line.includes("image#2ea8e5")';
            sCode = '当前检索条件为: </br>同时显示红色图和紫色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "y" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#ffd400")||line.includes("image#a28ae5")';
            sCode = '当前检索条件为: </br>同时显示黄色图和紫色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "g" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#5fb236")||line.includes("image#a28ae5")';
            sCode = '当前检索条件为: </br>同时显示绿色图和紫色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "b" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#2ea8e5")||line.includes("image#a28ae5")';
            sCode = '当前检索条件为: </br>同时显示蓝色图和紫色图'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "p" && searchCodepro2 == "p" && searchCodepro3 == "i") {
            sQuery = 'line.includes("image#a28ae5")||line.includes("image#a28ae5")';
            sCode = '当前检索条件为: </br>紫色图'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "y" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #ffd400")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>黄色注释且具有【' + searchTag + '】标签的注释'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "g" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #5fb236")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>绿色注释且具有【' + searchTag + '】标签的注释'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "b" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #2ea8e5")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>蓝色注释且具有【' + searchTag + '】标签的注释'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "p" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #a28ae5")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>紫色注释且具有【' + searchTag + '】标签的注释'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "r" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #ff6666")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>红色注释且具有【' + searchTag + '】标签的注释'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "r" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#ff6666")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示红色图和所有带标签的注释'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "y" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#ffd400")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示黄色图和所有带标签的注释'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "g" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#5fb236")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示绿色图和所有带标签的注释'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "b" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#2ea8e5")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示蓝色图和所有带标签的注释'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "p" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#a28ae5")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示紫色图和所有带标签的注释'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "a" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示全色图和所有带标签的注释'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "a" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #")&&line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>全部具有【' + searchTag + '】标签的注释'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "p" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #a28ae5")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示紫色注释和所有带标签的注释'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "y" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #ffd400")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示黄色注释和所有带标签的注释'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "g" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #5fb236")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示绿色注释和所有带标签的注释'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "b" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #2ea8e5")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示蓝色注释和所有带标签的注释'
        } else if (searchCodepro0 == "n" && searchCodepro1 == "r" && searchTag == "" && searchCodepro3 == "t") {
            sQuery = 'line.includes("background-color: #ff6666")||line.includes("🏷️ #📝")';
            sCode = '当前检索条件为: </br>同时显示红色注释和所有带标签的注释'
        } else if (searchCodepro0 == "t" && searchCodepro2 != null && searchCodepro3 != null && searchCodepro2 != "a"&& searchCodepro2 != "r"&& searchCodepro2 != "g"&& searchCodepro2 != "b"&& searchCodepro2 != "y"&& searchCodepro2 != "p"&& searchCodepro3 != "a"&& searchCodepro2 != "r"&& searchCodepro3 != "y"&& searchCodepro3 != "b"&& searchCodepro3 != "g"&& searchCodepro3 != "p"&& searchCodepro3 == "t") {
            sQuery = 'line.includes("#' + searchCodepro1 + '")&&line.includes("#' + searchCodepro2 + '")&&line.includes("<span ")';
            sCode = '当前检索条件为: </br>同时具有【' + searchCodepro1 + '】和【' + searchCodepro2 + '】标签的注释'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "r" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#ff6666")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>红色且具有【' + searchTag + '】标签的图片'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "y" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#ffd400")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>黄色且具有【' + searchTag + '】标签的图片'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "g" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#5fb236")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>绿色且具有【' + searchTag + '】标签的图片'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "b" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#2ea8e5")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>蓝色且具有【' + searchTag + '】标签的图片'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "p" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#a28ae5")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>紫色且具有【' + searchTag + '】标签的图片'
        } else if (searchCodepro0 == "i" && searchCodepro1 == "a" && searchTag !=null && searchCodepro3 == "t") {
            sQuery = 'line.includes("image#")&&line.includes("#' + searchTag + '")';
            sCode = '当前检索条件为: </br>全色且具有【' + searchTag + '】标签的图片'
        }
    }

    if (sQuery == "") { dv.paragraph("--->【请选择支持的选项组合】<---") }
    let valueOfSearchTerm = "";
    const files = app.vault.getMarkdownFiles()
    let path = files.filter(item => item.parent.path.includes(vaultpath)).sort(function(x, y) { return x.stat.ctime - y.stat.ctime })
    let arr = path.map(async(file) => {
        const content = await app.vault.cachedRead(file)
        var lines = await content.split(/\n\^KEY.{8}\n/).filter(line => {
            return (
                eval(sQuery)
            )
        })
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i] + "<p>"
        }
        return ["[[" + file.name.split(".")[0] + "]]", lines]
    })
    Promise.all(arr).then(values => {

        const exists = values.filter(value => value[1][0] && value[0] != "[[Dataview 卡片笔记]]")
        var outPages = 0
        for (let paperPages = 0; paperPages < exists.length; paperPages = paperPages + 1) {
            outPages = outPages + exists[paperPages][1].length
        }
        dv.paragraph(sCode)
        dv.paragraph("当前检索结果如下: ")
    if(app.plugins.plugins.dataview.manifest.version=="0.4.26"){
        dv.table(["文献共计 " + exists.length + " 篇", "笔记共计 " + outPages + " 条"], exists)}else{dv.table(["文献", "笔记共计 " + outPages + " 条"], exists)}
    })
} else { dv.paragraph("# 请安装并启用插件【MetaEdit】及【Buttons】") }
```
