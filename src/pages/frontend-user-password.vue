<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <div class="settings-main card">
                    <div class="settings-main-content">
                        <a-input title="当前密码">
                            <input type="password" v-model="form.old_password" placeholder="当前密码" class="base-input" name="old_password">
                        </a-input>
                        <a-input title="新的密码">
                            <input type="password" v-model="form.password" placeholder="新的密码" class="base-input" name="password">
                        </a-input>
                        <a-input title="确认密码">
                            <input type="password" v-model="form.re_password" placeholder="确认密码" class="base-input" name="re_password">
                        </a-input>
                    </div>
                    <div class="settings-footer clearfix">
                        <a href="javascript:;" class="btn btn-blue">保存设置</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right">
            <account></account>
        </div>
    </div>
</template>

<script lang="babel">
import account from '../components/aside-account.vue'
import aInput from '../components/_input.vue'
export default {
    data() {
        return {
            form: {
                old_password: '',
                password: '',
                re_password: ''
            }
        }
    },
    components: {
        aInput,
        account
    }
}
</script>
