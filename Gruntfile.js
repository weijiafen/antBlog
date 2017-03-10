module.exports=function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		uglify:{
			options:{
				stripBanners:true,
				banner:'/*能够插入压缩文件前面的注释*/'
			},
			build:{
				files:{
					//合并两个基础文件为min。在开发完成后index.html的script引用需改成min文件
					'src/main/webapp/dist/js/index.min.js' : ['src/main/webapp/dist/js/common.js','src/main/webapp/dist/js/index.js']	
				} 
			},
			buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
                files: [{
                    expand:true,
                    cwd:'src/main/webapp/dist/js',//js目录下
                    src:'**/*.js',//所有js文件
                    dest: 'src/main/webapp/dest/js'//输出到此目录下
                }]
            },
		},
		//less插件配置
        less: {
        	build:{
        		options:{
        			compress:true
	        	},
	            files:{
	            	'src/main/webapp/build/style/main.css':'src/main/webapp/static/style/main.less'
	            }
        	}
        	
        },
        //自动添加css属性厂商前缀
        autoprefixer:{
        	options: {
		        //配置项
		        browsers: ['last 2 versions', '> 5%','ie <= 9','Firefox <= 20']  //浏览器兼容
		     },
		     build:{
		     	src:['src/main/webapp/build/style/main.css']
		     }
        },
		copy: {
		  main: {
		  	files:[
		  		{
		  			expand: true,
				    cwd:'src/main/webapp/static/style/',
				    src: '*.css',
				    dest: 'src/main/webapp/build/style/',
				},
				{
		  			expand: true,
				    cwd:'src/main/webapp/static/js/club/json',
				    src: '*.json',
				    dest: 'src/main/webapp/build/js/club/json/',
				},
				{
		  			expand: true,
				    cwd:'src/main/webapp/static/images',
				    src: '**',
				    dest: 'src/main/webapp/build/images',
				}
		  	]
		    
		  },
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.registerTask('uglify', ['uglify:buildall']);
	grunt.registerTask('default', ['copy','less:build','autoprefixer:build']);
}