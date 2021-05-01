import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss';

export function Header(){

const currentData = format(new Date(),'EEEEEE, d MMMM', {
    locale: ptBR,
});    
    return(
        <header className={styles.headerContainer}>              
               <a> <img src="/logo.svg" alt="Podcastr"></img> </a>                  
            <p>O melhor para você ouvir, sempre!</p>
            <span>{currentData}</span>
        </header>
    );
}