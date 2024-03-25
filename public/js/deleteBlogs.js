function deleteBlogs(id){
    axios.delete(`/api/blogs/${id}`).then( data =>{
    if(data.status == 200){
        location.replace(`/`)
    }else if(data.status == 404){
        location.replace('/not-found')
    }
})
}