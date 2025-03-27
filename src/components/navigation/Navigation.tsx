import { exhibitions } from '../../utils/exhibitions';
import ArticleBox from '../articleBox/ArticleBox';
import { academicWork } from '../../utils/academicWork';
import { projects } from '../../utils/projects';

export default function Navigation() {
  return (
    <nav>
      <ol className='text-sm flex flex-col gap-10'>
        <li>
          <span className='font-bold'>I. Exhibitions</span>
          <ul>
            {exhibitions.map((exhibition) => {
              return (
                <ArticleBox
                  key={exhibition.id}
                  title={exhibition.title}
                  url={exhibition.url}
                  postId={exhibition.postId}
                  additionalUrl={exhibition.additionalUrl}
                />
              );
            })}
          </ul>
        </li>
        <li>
          <span className='font-bold'>II. Academic Work</span>
          <ul>
            {academicWork.map((work) => {
              return (
                <ArticleBox
                  key={work.id}
                  title={work.title}
                  url={work.url}
                  postId={work.postId}
                  additionalUrl={work.additionalUrl}
                />
              );
            })}
          </ul>
        </li>
        <li>
          <span className='font-bold'>III. Projects</span>
          <ul>
            {projects.map((project) => {
              return (
                <ArticleBox
                  key={project.id}
                  title={project.title}
                  url={project.url}
                  postId={project.postId}
                  additionalUrl={project.additionalUrl}
                />
              );
            })}
          </ul>
        </li>
      </ol>
    </nav>
  );
}
