import styles from './Home.module.css';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main className={styles.container}>
      <form className={styles.form} >
        <input
          type="text"
          placeholder='Procure sua moeda...'
        />
        <button type='submit' >
          <BsSearch size={30} color='#fff'/>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id="tbody"> 
          <tr className={styles.tr}>

            <td className={styles.tdLabel} data-label='Moeda'>
              <div className={styles.name} >
                <Link to={'/detail/'}>
                  <span>Bitcoin</span> | BTC
                </Link>
              </div>
            </td>

            <td className={styles.tdLabel} data-label='Valor mercado'>
              1T
            </td>

            <td className={styles.tdLabel} data-label='Preço'>
              8.000
            </td>

            <td className={styles.tdLabel} data-label='Volume'>
              2B
            </td>

            <td className={styles.tdLabel} data-label='Mudança 24h'>
              <span className={styles.profit}> 2.5 </span>
            </td>

          </tr>
        </tbody>

      </table>
    </main>
  )
}