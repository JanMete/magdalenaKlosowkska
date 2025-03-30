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
                  postId={work.postId}
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
                  postId={project.postId}
                />
              );
            })}
          </ul>
        </li>
      </ol>
    </nav>
  );
}
