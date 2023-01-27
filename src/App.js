import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import Pagination from "./components/Pagination"

function App() {
  const [allData, setAllData] = useState([]);
  const [alteredData, setAlteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20)



  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
    .then((res) => res.json())
    .then((data) => setAllData(data));
  }, []);

  useEffect(() => {
    setAlteredData(allData);
  }, [allData]);



  let cards = alteredData.map((item) => {
    return <Card key={item.name} item={item} />;
  });

// Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  function sortAsc() {
    const sorted = [...alteredData].sort((a, b) => (a.name > b.name ? 1 : -1));
    setAlteredData(sorted);
  }

  function sortDesc() {
    const sorted = [...alteredData].sort((a, b) => (a.name > b.name ? -1 : 1));
    setAlteredData(sorted);
  }

  function handleChange(event) {
    if (event.target.value === "oceania") {
      const filtered = [...allData].filter(
        (country) => country.region === "Oceania"
      );
      setAlteredData(filtered);
    } else if (event.target.value === "lit") {
      const filtered = [...allData].filter((country) => country.area < 65300);
      setAlteredData(filtered);
    } else {
      setAlteredData(allData);
    }
  }



  return (
    <div >
      <Header />
      <div className="container">
        <div className="options">
          <select onChange={handleChange} className="filter-select">
            <option value="">--No Filter--</option>
            <option value="oceania">Oceania region</option>
            <option value="lit">Smaller than Lithuania</option>
          </select>

          <button onClick={sortAsc} className="sort-button">Ascending</button>
          <button onClick={sortDesc} className="sort-button">Descending</button>
        </div>

        {currentCards}
      </div>

      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={alteredData.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
