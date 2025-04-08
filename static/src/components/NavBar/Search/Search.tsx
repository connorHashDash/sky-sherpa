import "./Search.scss";



export default function Search() {
  return (
    <div id='search_menu'>
      <div id="search_bar">
        <div className='mag_glass' >
          <svg
            width="1em" height="1em" viewBox="0 0 20 20" className="align-middle me-3 text-gray-30 shrink-0 group-betterhover:hover:text-gray-70">
            <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round">
            </path>
          </svg>
        </div>
        <input
          autoFocus
          placeholder='Search'
          id='search_bar_input'
          type="text" />
      </div>
      <div id="date_outer_div">
      </div>
    </div>
  )
} 
