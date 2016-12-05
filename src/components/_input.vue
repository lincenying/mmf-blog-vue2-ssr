<template>
    <div class="settings-section">
        <div class="settings-item with-input">
            <h4 class="settings-title">{{ title }}</h4>
            <div class="settings-item-content">
                <div class="settings-input-wrap">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
export default {
    props: ['title']
}
</script>
