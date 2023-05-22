import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { genreFiltered, getAllBooks, filterAuthor, changePagina } from '../../redux/action'

//export function Filters({setCurrentPage, generos, setOrder}) {
export function Filters() {
  const dispatch = useDispatch()
 const booksPage = useSelector((state) => state.booksPage)
 console.log(booksPage);
  // const allBooks = useSelector((state) => state.allBooks)
  // console.log('allBooks' + allBooks);
  const books = useSelector(state => state.books)
  // console.log('books' + books);

  const [authorValue, setAuthorValue] = useState('')
  const [genreValue, setGenreValue] = useState('')

  //const extractedArray = booksPage.flatMap(obj => obj.gender)

  // useEffect(()=>{
  //   dispatch(getAllBooks())
  // }, [])

  const genresNoRepeat = books
    .flatMap(book => book.genders)
    .filter((genre, index, self) => self.findIndex(g => g === genre) === index);
    
    // console.log(genresNoRepeat);
    const sortGenres = genresNoRepeat.sort((a, b) => { 
      if(a > b) {return 1}
      if(b > a) {return -1}
    return 0
    })
    // console.log(sortGenres);

    
    const authorsNoRepeat = books
    .flatMap(book => book.authors)
    .filter((aut, index, self) => self.findIndex(a => a === aut) === index);

    const sortAuthors = authorsNoRepeat.sort((a, b) => { 
      if(a > b) {return 1}
      if(b > a) {return -1}
    return 0
    })
    
    //var uniqueAuthors = [...new Set(allBooks.map(obj => obj.authors))]

    
    const handleFilterGenre = (e) => {
      dispatch(genreFiltered(e.target.value))
      // dispatch(changePagina(1))
    }

  const handleFilterAuthor = (e) => {
    dispatch(filterAuthor(e.target.value))
    dispatch(changePagina(1))
    //setAuthorValue('')
  }

  const clearFilters = () => {
    setAuthorValue('')
    setGenreValue('')
    dispatch(genreFiltered('All'))
    dispatch(filterAuthor('All'))
    dispatch(changePagina(1))
  };

  return (
    <div >
      <h6 className='mx-2'>Filtrar por</h6>
      <div className='m-1 mb-3'>
        <select className='form-select' onChange={e => handleFilterAuthor(e)}  >
          <option value="" readOnly hidden>Autor...</option>
          <option value="All">Todos</option>
          {sortAuthors && sortAuthors.map((a, index) =>
            <option key={index} value={a}>{a}</option>
          )}
        </select>
      </div>
      <div className='m-1'>
        <select className='form-select' onChange={e => handleFilterGenre(e)}  >
          <option value="" readOnly hidden>Género...</option>
          <option value="All">Todos</option>
          {sortGenres && sortGenres.map((a, index) =>
            <option key={index} value={a}>{a}</option>
          )}
        </select>
      </div>
      <button className='btn btn-secondary' onClick={clearFilters}>
        Borrar filtros
      </button>
    </div>
  )
}