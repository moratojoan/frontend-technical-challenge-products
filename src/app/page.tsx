import Image from 'next/image';
import styles from './page.module.css';

export const data = {
  title: 'iPhone 6S Oro',
  description:
    'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
  price: '740',
  email: 'iphonemail@wallapop.com',
  image:
    'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png',
};
export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Item Manager</h1>
      <section>
        <ul>
          <li>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <p>{data.email}</p>
            <p>{data.price}</p>
            <Image src={data.image} alt={data.title} width={200} height={200} />
          </li>
        </ul>
      </section>
    </main>
  );
}
