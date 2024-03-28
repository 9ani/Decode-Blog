function sendRate(e){
    e.preventDefault()
    const comment_text = document.querySelector('#comment-text').value
    const author = document.querySelector('#comment-author').value
    const blog = document.querySelector('#comment-blog').value


    if(comment_text.length > 0){
        axios.post('/api/rate', { text: comment_text, authorId: author, blogId: blog}).then(data =>{
            if(data.data){
                console.log(data);
                location.reload()
            }
        })
    }
}