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

  const extractFirstTwoImages = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = doc.querySelectorAll('img');
    return Array.from(images)
      .slice(0, 2)
      .map((img) => img.outerHTML)
      .join('');
  };

  const extractRemainingImages = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = doc.querySelectorAll('img');
    return Array.from(images)
      .slice(2)
      .map((img) => img.outerHTML)
      .join('');
  };

  return (
    <li>
      <div
        onClick={handleClick}
        className='hover:text-primaryColor select-none cursor-pointer'
      >
        ⊹ {title}
      </div>
      {isModalOpen && postId && (
        <div
          className='modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-40'
          onClick={closeModal}
        >
          <div
            className='bg-primaryColor border-2 border-black relative w-11/12  z-50'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className='absolute top-2 right-5 text-3xl font-bold'
            >
              X
            </button>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {error.message}</div>}
            {data && (
              <iframe
                srcDoc={`
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
          }
          .main-content {
            display: flex;
            flex-direction: column;
          }
          .content-container {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
          }
          .image-container {
            width: 100%;
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
          a {
            text-decoration: none;
            color: black;
            font-weight: bold;
          }
          a:hover {
            color: #333;
            text-decoration: underline;
          }
          a:active {
            color: #555;
          }
          a:visited {
            color: black;
          }
          .remaining-images {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .remaining-images img {
            width: 100%;
          }
          @media (min-width: 768px) {
            .main-content {
              flex-direction: row;
            }
            .content-container {
              width: 50%;
            }
            .image-container {
              width: 50%;
            }
            .remaining-images {
              flex-direction: row;
              flex-wrap: wrap;
            }
            .remaining-images img {
              width: calc(50% - 5px);
            }
          }
        </style>
      </head>
      <body>
        <div class="main-content">
          <div class="content-container">
            <h1>${data.title.rendered}</h1>
            ${
              additionalUrl
                ? `<p><a href="${additionalUrl}" target="_blank" rel="noopener noreferrer">Online catalog</a></p>`
                : ''
            }
            ${removeImages(data.content.rendered)}
          </div>
          <div class="image-container">
            ${extractFirstTwoImages(data.content.rendered)}
          </div>
        </div>
        <div class="remaining-images">
          ${extractRemainingImages(data.content.rendered)}
        </div>
      </body>
    </html>
  `}
                className='w-full h-[40rem] md:h-[45rem] border-none'
              />
            )}
          </div>
        </div>
      )}
    </li>
  );
}
