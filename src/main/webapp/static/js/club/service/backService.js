import api from '../library/axios/api';
const Service = {
	 login: (detail) => {
        return api
            .post('/login', {
                data: detail,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    logOff:()=>{
        return api.post('/logOff').then((res)=>{
            return res
        },(error)=>{
            throw error;
        })
    },
    register:(detail)=>{
        return api.post('/register',{
            data:detail
        }).then((res)=>{
            return res
        },(error)=>{
            throw error;
        })
    },
    upload:(data)=>{
        return api.post('/upload',{
            data:data
        },{headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
            return res
        },(error)=>{
            throw error;
        })
    },
    getTop:()=>{
        return api.get('/resume/userTop').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setTop:(data)=>{
        return api.post('/resume/userTop',{
            data:data
        }).then((res)=>{
            return res
        },(error)=>{
            throw error;
        })
    },
    getInfo:()=>{
        return api.get('/back/getInfo').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getPersonalInfo:()=>{
        return api.get('/resume/personalInfo').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setPersonalInfo:(data)=>{
        return api.post('/resume/personalInfo',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getSkills:()=>{
        return api.get('/resume/skills').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setSkills:(data)=>{
        return api.post('/resume/skills',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getProjectExp:()=>{
        return api.get('/resume/projectExp').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setProjectExp:(data)=>{
        return api.post('/resume/projectExp',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteProjectExpItem:(id)=>{
        return api.delete('/resume/projectExpItem',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteProjectExpItemDes:(id)=>{
        return api.delete('/resume/projectExpItemDes',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getWorkExp:()=>{
        return api.get('/resume/workExp').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setWorkExp:(data)=>{
        return api.post('/resume/workExp',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteWorkExpItem:(id)=>{
        return api.delete('/resume/workExpItem',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getCompetitions:()=>{
        return api.get('/resume/competitions').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setCompetitions:(data)=>{
        return api.post('/resume/competitions',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteCompetitionsItem:(id)=>{
        return api.delete('/resume/competitionsItem',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getLibrary:()=>{
        return api.get('/resume/library').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setLibrary:(data)=>{
        return api.post('/resume/library',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteLibraryItem:(id)=>{
        return api.delete('/resume/libraryItem',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getCategory:()=>{
        return api.get('/blog/getCategory').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setCategory:(data)=>{
        return api.post('/blog/getCategory',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteMenu:(id)=>{
        return api.delete('/blog/deleteMenu',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteCategory:(id)=>{
        return api.delete('/blog/deleteCategory',{params:{id:id}}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getArticalList:(data)=>{
        return api.get('/blog/getArticalList',{params:{
            menuId:data.menuId,
            categoryId:data.categoryId,
            pageSize:data.pageSize,
            pageNum:data.pageNum
        }}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setArticalDetail:(data)=>{
        return api.post('/blog/ArticalDetail',{data:data}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getArticalDetail:(id)=>{
        return api.get('/blog/ArticalDetail',{params:{
            id:id
        }}).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
     getMessageList:()=>{
        return api
            .get('/blog/getMessageList')
            .then((res)=>{
                return res
            },(res)=>{
                throw new Error(res.msg)
            })
    },
}
export default Service;