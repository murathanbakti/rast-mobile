import React, { useCallback, useEffect, useState } from "react";
import "devextreme/dist/css/dx.light.css";
import { Column, DataGrid, Paging } from "devextreme-react/data-grid";
import "./assets/datagridTable.css";
import AddUser from "./AddUser";
import { NumberBox } from "devextreme-react";
import { ReactComponent as SearchIcon } from "./assets/svg/search-icon.svg";
import { ReactComponent as FilterIcon } from "./assets/svg/filter-icon.svg";
import { ReactComponent as PlusIcon } from "./assets/svg/plus-icon.svg";
import { ReactComponent as LeftArrow } from "./assets/svg/left-arrow.svg";
import { ReactComponent as RightArrow } from "./assets/svg/right-arrow.svg";

/* Localstorage den data Çekme işlemi */
const getData = localStorage.getItem("user");
let parseData = JSON.parse(getData);
const getPageIndex = localStorage.getItem("pageIndex");
const pageIndex = JSON.parse(getPageIndex);
let rowCountData = 9;
const getCountData = localStorage.getItem("rowCount");
rowCountData = JSON.parse(getCountData);

if (parseData == null) {
  parseData = [
    {
      socialMediaLink: "@murathanbakti",
      socialMediaName: "Murathan baktı",
      socialMediaDescription: "İnstagram'a Takip :D",
    },
  ];
}

const DategridTemplate = () => {
  const [searchValue, setSearchValue] = useState("");
  const [addScreenOpen, setAddScreenOpen] = useState(false);
  const [rowCount, setRowCount] = useState(rowCountData || 9); // Satır Sayısı
  const [maxPage, setMaxPage] = useState(1); // Maksimum Sayfa Sayısı
  let fillRows = JSON.parse(JSON.stringify(parseData));

  /* Yeni veri Ekleme ekranı açılma işlemi */
  const toggleAddScreen = useCallback(() => {
    setAddScreenOpen((prev) => !prev);
  }, [addScreenOpen]);

  /* Satır Sayısını Belirleme */
  const handleRowNumber = useCallback((e) => {
    const newValue = e.value || 1;
    setRowCount(newValue);
    localStorage.setItem("rowCount", newValue);
  }, []);

  /* Satır Sayısı arttırırken boş satırlar ekleme */
  useEffect(() => {
    if (fillRows.length < rowCount) {
      const difference = rowCount - fillRows.length;
      for (let i = 0; i < difference; i++) {
        fillRows.push({ id: null, name: null, value: null });
      }
    }
    setMaxPage(Math.ceil(parseData.length / rowCount));
  }, [rowCount]);

  /* Pagination */
  const handlePrev = () => {
    const newPageIndex = pageIndex - 1;
    localStorage.setItem("pageIndex", newPageIndex);
    window.location.reload();
  };
  const handleNext = () => {
    const newPageIndex = pageIndex + 1;
    localStorage.setItem("pageIndex", newPageIndex);
    window.location.reload();
  };
console.log(pageIndex);
  return (
    <section className="data-grid-container">
      <div className="table-header-settings">
        <div className="search-filter-container">
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search Console.."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <span className="search-svg-background">
              <SearchIcon />
            </span>
          </div>
          <div className="filter-button">
            <FilterIcon />
          </div>
        </div>
        <div className="open-add-user" onClick={toggleAddScreen}>
          <span className="open-add-icon">
            <PlusIcon />
          </span>
          <span className="open-add-text">Yeni Hesap Ekle</span>
        </div>
      </div>
      {/* User Ekleme  */}
      {addScreenOpen && (
        <AddUser onClose={toggleAddScreen} exData={parseData} />
      )}
      <DataGrid
        dataSource={fillRows}
        pager={{ visible: false }}
        searchPanel={{
          visible: false,
          text: searchValue,
        }}
        columnAutoWidth={true}
      >
        <Column
          dataField="socialMediaLink"
          caption="Sosyal Medya Linki"
          headerCellRender={({ column }) => (
            <div className="custom-header-cell">
              <span className="column-title">{column.caption}</span>
            </div>
          )}
        />
        <Column
          dataField="socialMediaName"
          rowAlternationEnabled={true}
          caption="Sosyal Medya Adı"
          headerCellRender={({ column }) => (
            <div className="custom-header-cell">
              <span className="column-title">{column.caption}</span>
            </div>
          )}
        />
        <Column
          dataField="socialMediaDescription"
          caption="Açıklama"
          minWidth={500}
          headerCellRender={({ column }) => (
            <div className="custom-header-cell">
              <span className="column-title">{column.caption}</span>
            </div>
          )}
        />
        <Paging
          enabled={true}
          defaultPageSize={rowCount}
          pageIndex={pageIndex}
        />
      </DataGrid>
      <div className="table-footer">
        <div className="row-count-container">
          <span>Show:</span>
          <NumberBox
            value={rowCount}
            onValueChanged={handleRowNumber}
            format="# rows"
            min={1}
            max={20}
            step={1}
            showSpinButtons={true}
            width={90}
          />
        </div>
        <div className="pagination-container">
          <button disabled={pageIndex == 0} onClick={handlePrev}>
            <LeftArrow />
          </button>
          <span className="page-index">{pageIndex + 1}</span>
          <span className="of">of</span>
          <span className="max-index">{maxPage}</span>
          <button>
            <RightArrow
              onClick={handleNext}
              disabled={maxPage > pageIndex + 1}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DategridTemplate;
