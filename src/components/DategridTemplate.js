import React, { useCallback, useState } from "react";
import "devextreme/dist/css/dx.light.css";
import { Column, DataGrid } from "devextreme-react/data-grid";
import "./assets/datagridTable.css";
import AddUser from "./AddUser";
import { NumberBox } from "devextreme-react";
import { ReactComponent as SearchIcon } from "./assets/svg/search-icon.svg";
import { ReactComponent as FilterIcon } from "./assets/svg/filter-icon.svg";
import { ReactComponent as PlusIcon } from "./assets/svg/plus-icon.svg";

/* Localstorage den data Çekme işlemi */
const getData = localStorage.getItem("user");
const parseData = JSON.parse(getData);



const DategridTemplate = () => {
  const [searchValue, setSearchValue] = useState("");
  const [addScreenOpen, setAddScreenOpen] = useState(false);
  const [rowCount, setRow] = useState(9); // Satır Sayısı

  /* Yeni veri Ekleme ekranı açılma işlemi */
  const toggleAddScreen = useCallback(() => {
    setAddScreenOpen((prev) => !prev);
  }, [addScreenOpen]);

  /* Satır Sayısını Belirleme */
  const handleRowNumber = useCallback((e) => {
    const newValue = e.value || 1;
    setRow(newValue);
  }, []);
  


//   // Eksik satırları oluşturmak için boş veriler
//   while (parseData.length < rowCount) {
//     parseData.push({ id: null, name: null, value: null });
//   }


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
          Yeni Hesap Ekle
        </div>
      </div>
      {/* User Ekleme  */}
      {addScreenOpen && (
        <AddUser onClose={toggleAddScreen} exData={parseData} />
      )}
      <DataGrid
        dataSource={parseData}
        paging={{
          enabled: true,
          pageSize: rowCount,
        }}
        searchPanel={{
          visible: false,
          text: searchValue,
        }}
      >
        <Column
          dataField="socialMediaLink"
          caption="Sosyal Medya Linki"
          width={250}
          headerCellRender={({ column }) => (
            <div className="custom-header-cell">
              <span className="column-title">{column.caption}</span>
            </div>
          )}
        />
        <Column
          dataField="socialMediaName"
          rowAlternationEnabled={true}
          width={250}
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
      </DataGrid>
      {/* row Filter start */}
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
      {/* row Filter end */}
    </section>
  );
};

export default DategridTemplate;
