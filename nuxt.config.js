const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

class TailwindExtractor {
	static extract (content) {
		return content.match(/[A-Za-z0-9-_:\/]+/g) || []
	}
}

module.exports = {
	mode: 'spa',
	head: {
		script: process.env.DEPLOY_ENV === 'GH_PAGES' ? [{src: '/scrum-poker/gh-spa.js'}] : []
	},
	loading: false,
	manifest: {
		name: 'Scrum Poker',
		short_name: 'Scrum Poker',
		theme_color: '#24292e',
		orientation: 'portrait',
		ogImage: {
			width: 300,
			height: 300,
			path: 'https://horacekeung.github.io/scrum-poker/_nuxt/img/qr-code.b12e5f0.png',
			type: 'image/png'
		}
	},
	modules: ['@nuxtjs/pwa'],
	build: {
		extractCSS: true,
		// Run ESLint on save
		extend(config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
			// Cleanup CSS with PurgeCSS
			if (!isDev) {
				config.plugins.push(
					new PurgecssPlugin({
						paths: glob.sync([
							path.join(__dirname, './pages/**/*.vue'),
							path.join(__dirname, './layouts/**/*.vue'),
							path.join(__dirname, './components/**/*.vue')
						]),
						extractors: [{
							extractor: TailwindExtractor,
							extensions: ['vue']
						}],
						whitelist: ['html', 'body'],
						whitelistPatterns: [/^btn/]
					})
				)
			}
		}
	},
	css: ['@/assets/css/global.css'],
	plugins: ['~/plugins/main.js'],
	router: {
		base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/scrum-poker/' : ''
	}
}
