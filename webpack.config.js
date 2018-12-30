const HTMLWebpackPlugin=require('html-webpack-plugin')
const HTMLWebpackPluginConfig=new HTMLWebpackPlugin({
	template:__dirname+'/app/index.html',
	filename:'index.html',
	inject:'body'
})

module.exports={
	devServer:{
		disableHostCheck:true
	},
	node:{
		fs:'empty'
	},
	entry:__dirname+"/app/index.js",
	module:{
		rules:[
		{
			test:/.js$/,
			exclude:/node_modules/,
			use:'babel-loader'
		},
		{
			test:/.css$/,
			use:['style-loader','css-loader']
		}
	]},
	output:{
		filename:'bundle.js',
		path:__dirname+'/build'
	},
	plugins:[HTMLWebpackPluginConfig]
}