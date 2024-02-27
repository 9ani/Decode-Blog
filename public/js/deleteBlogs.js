function deleteBlogs(id) {
    axios.delete(`/api/blogs/${id}`)
        .then(response => {
            console.log('Delete Blog Response:', response);

            if (response.status === 200) {
                console.log('Blog deleted successfully.');
                location.replace('/');
            } else {
                console.error('Unexpected status code:', response.status);
                location.replace('/not-found');
            }
        })
        .catch(error => {
            console.error('Error deleting blog:', error);

            // Check if it's a 404 error
            if (error.response && error.response.status === 404) {
                location.replace('/not-found');
            }
        });
}
