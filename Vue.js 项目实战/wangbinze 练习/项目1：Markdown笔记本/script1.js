new Vue({
    name: 'my markdown app',
    el: "#notebook",
    data() {
        return {
            content: localStorage.getItem('content') || '你可以在此编写你的markdown笔记了',
            //新的！一个笔记数组
            notes: [],
            //选择笔记的ID
            selectedId: null
        }
    },
    computed: {
        notePreview() {
            return marked(this.content)
                // return this.selectedNode ? marked(this.selectedNode.content) : ''
        },
        // selectedNode() {
        //     //返回与selectedId匹配的笔记
        //     return this.notes.find(note => note.id === this.selectedId)
        // },
    },
    methods: {
        saveNote(val) {
            console.log('保存笔记：', val)
            localStorage.setItem('content', val)
            this.reportOperation('saving')
        },
        reportOperation(opName) {
            console.log('the', opName, 'operation was completed!')
        },

        //用一些默认值添加一条笔记，并将其添加到笔记数组中
        addNote() {
            const time = Date.now();
            const note = {
                    id: String(time),
                    title: 'New note ' + (this.notes.length + 1),
                    content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                    created: time,
                    favorite: false,
                }
                //添加到列表中
            this.notes.push(note)
        },
        selectNode(note) {
            this.selectedId = note.id
        }
    },
    watch: {
        //修改侦听器
        /*content: {
            handler(val, oldVal) {
                console.log('修改后，', val, '修改前：', oldVal)
            },
        }*/
        //简写,只用到handler监听，不需要用到deep和immediate时
        /*content(val, oldVal) {
            console.log('修改后，', val, '修改前：', oldVal)
                //利用浏览器缓存，保存笔记
            localStorage.setItem('content', val)
        }*/
        /*content: {
            handler: 'saveNote'
        }*/
        //同上
        // content: 'saveNote'
        content(val, oldVal) {
            localStorage.setItem('content', val)
        }
    },
    created() {
        //将content设置为存储的内容
        //如果没有保存任何内容则设置为一个默认字符串
        this.content = localStorage.getItem('content') || '你可以在此编写你的markdown笔记了'
    },
})

console.log('恢复笔记:', localStorage.getItem('content'))