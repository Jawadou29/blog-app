import "./paganation.css";

function Pagination({pages, currentPage, setCurrentPage}) {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  return (
    <div className="pagenation">
      <button
        className="page previous"
        onClick={() => setCurrentPage(prev => prev - 1)}
        disabled={currentPage === 1}
      >
        previous
      </button>
      {generatedPages.map(page => (
        <div 
          onClick={() => setCurrentPage(page)}
          key={page}
          className={currentPage === page ? "page active" : "page"}>
            {page}
        </div>
      ))}
      <button 
        className="page next"
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={currentPage === pages}
      >
        next
      </button>
    </div>
  )
}

export default Pagination