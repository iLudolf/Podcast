//SPA - Single Page Applications, ou (Aplicações de Página Única)
import { GetStaticProps } from 'next';

import { api } from "../services/api";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import styles from "./home.module.scss"
//SSR - Server Side Rendering - (Rendering for server Node js) 
//toda request será solicitada ao servidor ao servidor 

//SSG - (Rendering for server Next js)
// Define uma pagina estatica e todos os usuarios receberam essa pagina static em tempo x


type Episode = {
  id: string,
  title: string,
  thumbnail: string, 
  members: string,
  publishedAt: string,   
  duration: number,
  durationAsString: number,
  descriptio: string,
  url: string,
};

//Propriedades do componente Home
type HomeProps = {  
  latestEpisodes: Array<Episode>;
  allEpisodes: Array<Episode>;
}


export default function Home( {latestEpisodes, allEpisodes}: HomeProps) {
   return (
    <div className={styles.homePage}>
       <section className={styles.latestEpisodes}>
            <h2>últimos lançamentos</h2>
       </section>
       <section className={styles.allEpisodes}>

       </section>
    </div>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes',{
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  })
  
const episodes = data.map( episode =>{
  return {
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail, 
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),   
    duration: Number(episode.file.duration),
    durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
    descriptio: episode.description,
    url: episode.file,

  }
})

const latestEpisodes = episodes.slice(0,2);
const allEpisodes =  episodes.slice(2, episodes.length);

  return { 
    props:{
      latestEpisodes,
      allEpisodes,
    }, 
    revalidate: 60 * 60 * 8, //tempo para que seja construido uma nova pagina static
  }
}
