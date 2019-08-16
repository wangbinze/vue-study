Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'))

// New VueJS instance
new Vue({
    name: 'notebook',

    // CSS selector of the root DOM element
    el: '#notebook',

    // Some data
    data() {
        return {
            // These are loaded from localStorage and have a default value
            // Don't forget the JSON parsing for the notes array
            //这些是从localStorage加载的，并具有默认值
            //不要忘记notes数组的JSON解析
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            selectedId: localStorage.getItem('selected-id') || null,
        }
    },

    //计算属性
    computed: {
        selectedNote() {
            // We return the matching note with selectedId
            //我们用selectedId返回匹配的音符
            return this.notes.find(note => note.id === this.selectedId)
        },

        notePreview() {
            // Markdown呈现为HTML
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },

        sortedNotes() {
            return this.notes.slice().sort((a, b) => a.created - b.created)
                .sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
        },

        linesCount() {
            if (this.selectedNote) {
                //计算换行符号的数量
                return this.selectedNote.content.split(/\r\n|\r|\n/).length
            }
        },

        wordsCount() {
            if (this.selectedNote) {
                var s = this.selectedNote.content
                    //将新行cahracters转换为空格
                s = s.replace(/\n/g, ' ')
                    //排除开始和结束空格
                s = s.replace(/(^\s*)|(\s*$)/gi, '')
                    //将2个或更多重复的空格转换为1
                s = s.replace(/[ ]{2,}/gi, ' ')
                    //返回空格数
                return s.split(' ').length
            }
        },

        charactersCount() {
            if (this.selectedNote) {
                return this.selectedNote.content.split('').length
            }
        },
    },

    // Change watchers
    watch: {
        // When our notes change, we save them
        notes: {
            // The method name
            handler: 'saveNotes',
            // We need this to watch each note's properties inside the array
            deep: true,
        },
        // Let's save the selection too
        selectedId(val, oldVal) {
            localStorage.setItem('selected-id', val)
        },
    },

    methods: {
        // Add a note with some default content and select it
        addNote() {
            const time = Date.now()
                // Default new note
            const note = {
                    id: String(time),
                    title: 'New note ' + (this.notes.length + 1),
                    content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                    created: time,
                    favorite: false,
                }
                // Add
            this.notes.push(note)
                // Select
            this.selectNote(note)
        },

        // Remove the selected note and select the next one
        removeNote() {
            if (this.selectedNote && confirm('Delete the note?')) {
                // Remove the note in the notes array
                const index = this.notes.indexOf(this.selectedNote)
                if (index !== -1) {
                    this.notes.splice(index, 1)
                }
            }
        },

        selectNote(note) {
            // This will update the 'selectedNote' computed property
            this.selectedId = note.id
        },

        saveNotes() {
            // Don't forget to stringify to JSON before storing
            localStorage.setItem('notes', JSON.stringify(this.notes))
            console.log('Notes saved!', new Date())
        },

        favoriteNote() {
            // this.selectedNote.favorite = !this.selectedNote.favorite
            // this.selectedNote.favorite = this.selectedNote.favorite ^ true
            this.selectedNote.favorite ^= true
        },
    },
})