import { useWordPressPost } from '../../hooks/useFetchWordPressPost';

export default function About() {
  const { data, isLoading, isError, error } = useWordPressPost(126);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
      <div
        className='max-w-5xl'
        dangerouslySetInnerHTML={{ __html: data.content.rendered }}
      />
    );
  }

  return null;
}
