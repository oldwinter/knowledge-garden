---
date created: 2022-08-19
date modified: 2022-08-20
metatable: true
searchFinish: All
searchMonth: All
searchYear: All
title: Dataview 年月统计
---

```dataviewjs
let vaultpath = "";
const metaeditEnabled = app.plugins.enabledPlugins.has("metaedit");
const buttonEnabled = app.plugins.enabledPlugins.has("buttons");
const thisFile = dv.pages().where(f => f.file.path == dv.current().file.path)
let searchYear = dv.current().searchYear;
let searchMonth = dv.current().searchMonth;
let searchFinish = dv.current().searchFinish;
var searchX0 = ""
var searchX1 = ""
var searchF = ""
if (metaeditEnabled === true && buttonEnabled === true) {
    const { update } = this.app.plugins.plugins["metaedit"].api;

    const yearDropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const arr = dv.pages().filter(t => t.file.path.includes(vaultpath)).importDate.c.year
        var years = Array.from(new Set(arr)).sort()
        years = years.map(function(i) { return i + '年' })
        years.unshift("All")
        const dropdown = this.container.createEl('select');
        years.forEach((year, index) => {
            var opt = year;
            var el = dropdown.createEl('option');
            opt != "All" ? el.textContent = opt : el.textContent = "选择年份";
            el.value = opt;
            dropdown.appendChild(el);
        })
        years.indexOf(searchYear.toString()) < 0 ? dropdown.selectedIndex = 0 : dropdown.selectedIndex = years.indexOf(searchYear.toString())
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, years[dropdown.selectedIndex], file)
        })
        return dropdown
    }

    const monthDropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const arr = dv.pages().filter(t => t.file.path.includes(vaultpath)).importDate.c.month
        var months = Array.from(new Set(arr)).sort()
        months.unshift()
        months = months.map(function(i) { return i + '月' })
        months.unshift("All")
        const dropdown = this.container.createEl('select');
        months.forEach((month, index) => {
            var opt = month;
            var el = dropdown.createEl('option');
            opt != "All" ? el.textContent = opt : el.textContent = "选择月份";
            el.value = opt;
            dropdown.appendChild(el);
        })
        months.indexOf(searchMonth.toString()) < 0 ? dropdown.selectedIndex = 0 : dropdown.selectedIndex = months.indexOf(searchMonth.toString())
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, months[dropdown.selectedIndex], file)
        })
        return dropdown
    }

    const FinishDropdownMaker = (pn, fpath) => {
        const file = this.app.vault.getAbstractFileByPath(fpath)
        const optionsText = ["全部", "已读", "未读"];
        const optionsValue = ["All", "Done", "unread"]
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
        dropdown.selectedIndex != null ? dropdown.selectedIndex = optionsValue.indexOf(searchFinish.toString()) : dropdown.selectedIndex = 0;
        dropdown.addEventListener('change', async evt => {
            evt.preventDefault();
            await update(pn, optionsValue[dropdown.selectedIndex], file)
        })
        return dropdown
    }

    dv.paragraph("## 检索年份: ")
    dv.paragraph(yearDropdownMaker('searchYear', dv.current().file.path))
    dv.paragraph("## 检索月份: ")
    dv.paragraph(monthDropdownMaker('searchMonth', dv.current().file.path))
    dv.paragraph("## 阅读状态: ")
    dv.paragraph(FinishDropdownMaker('searchFinish', dv.current().file.path))

    if (searchMonth != "All" && searchYear != "All") {
        if (parseInt(searchMonth).toString().length == 1) {
            searchX0 = parseInt(searchYear) + "-0" + (parseInt(searchMonth))
            searchX1 = parseInt(searchYear) + "-0" + (parseInt(searchMonth) + 1)
        } else if (parseInt(searchMonth).toString().length == 2) {
            searchX0 = parseInt(searchYear) + "-" + (parseInt(searchMonth))
            searchX1 = parseInt(searchYear) + "-" + (parseInt(searchMonth) + 1)
        }
        var Y0 = new Date(searchX0).getTime()
        var Y1 = new Date(searchX1).getTime()
        console.log(searchX0)
        console.log(Y0)
        console.log(searchX1)
        console.log(Y1)

        if (searchFinish == "Done") {
            dv.paragraph("## " + dv.current().searchYear + dv.current().searchMonth + "已读" + dv.pages().filter(t => t.importDate >= Y0 && t.importDate < Y1-86400000).filter(t => t.file.tags.toString().includes("Done")).length + "篇:")
            searchF = 'AND contains(file.tags,"Done")'
        } else if (searchFinish == "unread") {
            dv.paragraph("## " + dv.current().searchYear + dv.current().searchMonth + "未读" + dv.pages().filter(t => t.importDate >= Y0 && t.importDate < Y1-86400000).filter(t => t.file.tags.toString().includes("unread")).length + "篇:")
            searchF = 'AND contains(file.tags,"unread")'
        } else { dv.paragraph("## " + dv.current().searchYear + dv.current().searchMonth + "共导出" + dv.pages().filter(t => t.importDate >= Y0 && t.importDate < Y1-86400000).length + "篇:") }
        dv.paragraph(
            `\`\`\`dataview
table shortTitle AS "中文标题",publicationTitle AS "刊名",file.tags AS 标签
from "" 
where date(${searchX1}) > importDate AND importDate >= date(${searchX0}) ${searchF}
\`\`\``
        )
    } else { dv.paragraph("### 请完成选择") }
} else { dv.paragraph("# 请安装并启用插件【MetaEdit】及【Buttons】") }
```
