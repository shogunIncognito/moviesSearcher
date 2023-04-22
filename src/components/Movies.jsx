export default function Movies ({ data }) {
  if (!data) return <p>No hay datos</p>
  return (
    <div className='movies'>
      {data.map(el => (
        <div className='movie' key={el.imdbID}>
          <h4>{el.Title}</h4>
          <p>{el.Year}</p>
          <img style={{ height: '80%' }} src={el.Poster} alt={el.Title} />
        </div>
      ))}
    </div>
  )
}
