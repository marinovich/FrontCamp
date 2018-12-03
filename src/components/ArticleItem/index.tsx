import { JSXRenderer } from 'lib/JSXRenderer';
import * as defaultImage from 'images/default-news.png';
import * as Models from './models';
import * as styles from './styles.css';

export const ArticleItem = (props: Models.IArticleItemProps) => {
  const {
    article: {
      title,
      description,
      url,
      urlToImage,
    },
  } = props;

  function getArticlePreview() {
    return urlToImage || defaultImage;
  }

  return (
    <li className={styles['ArticleItem']}>
      <div className={styles['ArticleItem__image-container']}>
        <img src={getArticlePreview()} alt="article logo" className={styles['ArticleItem__image']} />
      </div>
      <div className={styles['ArticleItem__info']}>
        <h3 className={styles['ArticleItem__caption']}>{title}</h3>
        <p className={styles['ArticleItem__description']}>{description}</p>
        <a href={url} target="_blank" className={styles['ArticleItem__link']}>Read more</a>
      </div>
    </li>
  );
};
