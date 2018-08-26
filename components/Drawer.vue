<template>
	<div class="relative">
		<div v-hammer:panstart="startPan" v-hammer:pan="onPan" v-hammer:panend="endPan" :class="className" :style="`transform: translateX(${translate});`">
			<slot/>
		</div>
		<div v-hammer:panstart="startPan" v-hammer:pan="onPan" v-hammer:panend="endPan" class="w-4 h-screen absolute z-10"></div>
	</div>
</template>

<script>
export default {
	props: {
		className: {type: String},
		isOpen: {type: Boolean, required: true}
	},
	computed: {
		translate () {
			if (this.anchor) {
				const dist = this.cursorX - this.anchor
				return (dist > 0 ? 0 : dist) + 'px'
			}
			return this.isOpen ? '0' : '-100%'
		}
	},
	methods: {
		startPan (e) { this.anchor = e.center.x },
		onPan (e) { this.cursorX = e.center.x },
		endPan (e) {
			this.$emit('update:isOpen', e.center.x > this.anchor)
			this.cursorX = null
			this.anchor = null
		},
	},
	data: () => ({
		anchor: null,
		cursorX: null
	})
}
</script>
