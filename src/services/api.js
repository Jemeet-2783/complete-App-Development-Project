const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiService = {
  getPosts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts?_limit=15`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  getPostDetails: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch post details');
      return await response.json();
    } catch (error) {
      console.error('Error fetching post details:', error);
      throw error;
    }
  },

  getComments: async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }
};
