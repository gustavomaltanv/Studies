import not_found from '../../images/not_found.svg';

export function NotFound() {
  return (
    <main>
      <img src={not_found} alt="error 404" width={404}/>
      <h1>página não encontrado</h1>
    </main>
  )
}