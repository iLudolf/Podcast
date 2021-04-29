//SPA - Single Page Applications, ou (Aplicações de Página Única)

//SSR - Server Side Rendering - (Rendering for server Node js) 
//toda request será solicitada ao servidor ao servidor 

//SSG - (Rendering for server Next js)
// Define uma pagina estatica e todos os usuarios receberam essa pagina static em tempo x

export default function Home() {
   return (
  <h1>Index</h1>
  );
}


export async function getStaticProps(){
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return { 
    props:{
      episodes: data,
    }, 
    revalidate: 60 * 60 * 8, //tempo para que seja construido uma nova pagina static
  }
}
