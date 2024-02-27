async function searchBlogs() {
    const searchInput = document.getElementById('blogSearchInput').value.trim();
    console.log('Search Input:', searchInput);

    try {
        const response = await fetch(`/api/blogs/search?title=${encodeURIComponent(searchInput)}`);
        console.log('Response:', response);

        if (response.ok) {
            const blogs = await response.json();
            console.log('Matching Blogs:', blogs);

            // Handle the fetched blogs, e.g., display them on the page
            // For now, let's just log the titles
            blogs.forEach(blog => console.log(blog.title));
        } else {
            console.error('Failed to fetch matching blogs');
        }
    } catch (error) {
        console.error('Error searching blogs:', error);
    }
}
