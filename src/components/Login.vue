<template>
    <section class="container">
        <div class="login">
            <h1>后台管理</h1>
            <form id="shake-setting" action="#" method="post">
                <p><input v-model="form.username" type="text" name="username" value="" placeholder="请输入用户名"></p>
                <p><input v-model="form.password" type="password" name="password" value="" placeholder="请输入密码"></p>
                <p class="remember_me">
                    <label>
                        <input v-model="form.remember_me" type="checkbox" name="remember_me" id="remember_me">
                        保持登录
                    </label>
                </p>
                <p class="submit"><input type="submit" value="登录" @click="handleSubmit" :disabled="form.usrname != '' && form.password != '' ? null: 'true'"></p>
            </form>
        </div>
    </section>
</template>
<script lang="babel">
    import { mapGetters } from 'vuex'
    import api from '../api'
    export default {
        computed: {
            ...mapGetters({
                global: 'getGlobal'
            })
        },
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    remember_me: ''
                }
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
                api.login(this.form).then(data => {
                    this.$store.commit('GLOBAL_LOGIN_STATUS', data._sessionToken)
                    this.$store.commit('GLOBAL_LOGIN_FORM', false)
                    this.$store.dispatch('showMsg', {
                        content: '登录成功',
                        type: 'success'
                    })
                })
            }
        }
    }
</script>
