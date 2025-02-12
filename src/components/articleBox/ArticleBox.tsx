import { useState } from 'react';
import { useWordPressPost } from '../../hooks/useFetchWordPressPost';

type ArticleBoxProps = {
  title: string;
  url?: string;
  postId?: number;
  additionalUrl?: string;
};

export default function ArticleBox({
  title,
  url,
  postId,
  additionalUrl,
}: ArticleBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useWordPressPost(postId || 0, {
    enabled: !!postId,
  });

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    } else if (postId) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const removeImages = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = doc.querySelectorAll('img');
    images.forEach((img) => img.remove());
    return doc.body.innerHTML;
  };
  // Function to extract the first two images
  const extractFirstTwoImages = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = doc.querySelectorAll('img');
    return Array.from(images)
      .slice(0, 2) // Take only the first two images
      .map((img) => img.outerHTML)
      .join('');
  };

  // Function to extract the remaining images
  const extractRemainingImages = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = doc.querySelectorAll('img');
    return Array.from(images)
      .slice(2) // Skip the first two images
      .map((img) => img.outerHTML)
      .join('');
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className='bg-articleBackground inline-block border-2 border-black p-2 hover:underline select-none cursor-pointer'
      >
        {title}
      </div>
      {isModalOpen && postId && (
        <div className='flex w-full justify-center'>
          <div className='bg-articleBackground border-2 border-black absolute top-14 w-11/12 z-50'>
            <button
              onClick={closeModal}
              className='absolute top-2 right-5 text-3xl font-bold'
            >
              X
            </button>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {error.message}</div>}
            {data && (
              <>
                <iframe
                  srcDoc={`
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column; /* Change to column layout */
          }
          .main-content {
            display: flex;
            justify-content: space-between;
          }
          .content-container {
            width: 50%;
            padding: 20px;
            box-sizing: border-box;
          }
          .image-container {
            width: 50%;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .image-container img,
          .remaining-images img {
            max-width: 100%;
            height: auto;
          }
          h1 {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }
          /* Styles for the <a> tag */
          a {
            text-decoration: none; /* Remove underline */
            color: black; /* Set font color to black */
            font-weight: bold;
          }
          a:hover {
            color: #333; /* Slightly darker on hover */
            text-decoration: underline;
          }
          a:active {
            color: #555; /* Even darker when active (clicked) */
          }
          a:visited {
            color: black; /* Keep the same color for visited links */
          }
          /* Styles for the remaining images container */
          .remaining-images {
            width: 100%; /* Take full width of the main container */
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .remaining-images img {
            width: calc(50% - 5px); /* Each image takes half the width minus half the gap */
          }
        </style>
      </head>
      <body>
        <div class="main-content">
          <div class="content-container">
            <h1>${data.title.rendered}</h1>
            <p><a href="${additionalUrl}" target="_blank" rel="noopener noreferrer">Read more</a></p>
            ${removeImages(data.content.rendered)}
          </div>
          <div class="image-container">
            <!-- Display first two images in the right column -->
            ${extractFirstTwoImages(data.content.rendered)}
          </div>
        </div>
        <!-- Display remaining images below the main content -->
        <div class="remaining-images">
          ${extractRemainingImages(data.content.rendered)}
        </div>
      </body>
    </html>
  `}
                  className='w-full h-[52rem] border-none'
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
