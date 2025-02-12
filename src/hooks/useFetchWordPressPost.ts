import { useQuery } from '@tanstack/react-query';

const fetchWordPressPost = async (postId: number) => {
  const siteID = 'magdaportfolio5.wordpress.com';
  const response = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/${siteID}/posts/${postId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  const data = await response.json();
  console.log('Fetched post data:', data);
  return data;
};

export const useWordPressPost = (postId: number, options = {}) => {
  return useQuery({
    queryKey: ['wordPressPost', postId],
    queryFn: () => fetchWordPressPost(postId),
    ...options,
  });
};
