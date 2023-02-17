module.exports = {
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					{ loader: 'css-loader', modules: true },
					// Compiles Sass to CSS
					{ loader: 'sass-loader', modules: true },
					'postcss-loader',
				],
			},
		],
	},
};
