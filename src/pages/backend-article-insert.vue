<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="标题">
                <input type="text" v-model="form.title" placeholder="标题" class="base-input" name="title">
                <span class="input-info error">请输入标题</span>
            </a-input>
            <a-input title="分类" :classes="'select-item-wrap'">
                <i class="icon icon-arrow-down"></i>
                <select v-model="form.category" class="select-item" name="category">
                    <option value="">请选择分类</option>
                    <option value="0086">中国 +86 </option>
                    <option value="001">美国 +1 </option>
                </select>
                <span class="input-info error">请输入分类</span>
            </a-input>
            <div class="settings-section">
                <div id="post-content" class="settings-item-content">
                    <textarea id="editor" name="content" class="form-control hidden" data-autosave="editor-content"></textarea>
                </div>
            </div>
        </div>
        <div class="settings-footer clearfix">
            <router-link to="/backend/user/list" class="btn btn-blue">返回</router-link>
            <a href="javascript:;" class="btn btn-yellow">编辑管理员</a>
        </div>
    </div>
</template>

<script lang="babel">
import aInput from '../components/_input.vue'
export default {
    data() {
        return {
            form: {
                title: '',
                category: '',
                content: ''
            }
        }
    },
    components: {
        aInput
    },
    mounted() {
        // eslint-disable-next-line
        window.postEditor = editormd("post-content", {
            width: "100%",
            height: 500,
            markdown: "",
            placeholder: '请输入内容...',
            path: 'http://static.mmxiaowu.com/vue/static/editor.md/lib/',
            toolbarIcons() {
                return [
                    "bold", "italic", "quote", "|",
                    "list-ul", "list-ol", "hr", "|",
                    "link", "reference-link", "image", "code", "code-block", "table", "|",
                    "watch", "preview", "fullscreen", "|",
                    "help"
                ]
            },
            watch : false,
            saveHTMLToTextarea : true,
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"]
        })
    }
}
</script>
