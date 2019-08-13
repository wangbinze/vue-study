var app = new Vue({
    name: 'Markdown',
    el: "#notebook",

    //一些数据
    data() {
        return {
            content: localStorage.getItem('content') || 'You can write in **markdown**',
            //新的！一个笔记数组
            notes: [],
        }
    },

    //计算属性
    computed: {
        notePreview() {
            //Markdown渲染HTML
            return marked(this.content)
        },
        addButtonTitle() {
            return notes.length + 'note(s) already'
        }
    },
    methods: {
        //用一些默认值添加一条笔记，并将其添加到笔记数组中
        addNote() {
            const time = Date.now()
                //新笔记的默认值
            const note = {
                    id: String(time),
                    title: 'New note ' + (this.notes.length + 1),
                    content: '**Hi!** This notebook is using [markdown] (https://github.com.adma-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                    created: time,
                    favorite: false
                }
                //添加到列表中
            this.notes.push(note)
        },
        saveNote(val) {
            console.log('saving note:', this.content)
            localStorage.setItem('content', this.content)
        },
    },
    //修改侦听器
    watch: {
        //侦听器content数据属性
        // content: {
        //     handler(val, oldVal) {
        //         console.log('new note:', val, 'old note:', oldVal)
        //     }
        // }
        //不需要侦听器其他选项时
        // content(val, oldVal) {
        //     console.log('new note:', val, 'old note:', oldVal)
        //     localStorage.setItem('content', val)
        // }


        // content: {
        //     handler: 'saveNote'
        // }
        //同上
        // content: 'saveNote'

        content(val, oldVal) {
            console.log('new note:', val, 'old note:', oldVal)
            console.log('saving note', this.content)
            localStorage.setItem('content', this.content)
        }
    },

    //当实例准备就绪会调用这个钩子
    created() {
        //将content设置为存储的内容
        //如果没有保存任何内容则设置为一个默认的字符串
        this.content = localStorage.getItem('content') || 'You can write in **markdown**'
    },
})