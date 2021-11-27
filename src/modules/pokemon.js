import "./pokemon.scss";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { PokemonService } from '../services/axios-service';
import { useDispatch, useSelector } from "react-redux";
import { handleFavourite } from "../services/reducers/rootReducer";
import MainToolBar from "./toolbar/toolbar";
import { requestSearch } from "../helper/stringHelper";
import Title from "./title/title";
import MainModal from "./modal/modal";
import MainSnackBar from "./snack-bar/snack-bar";
import MainCheckBox from "./checkbox/checkbox";
import MainButton from "./button/button";

export default function Pokemon() {
  const dispatch = useDispatch();
  const pageSize = 20;
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrentPage] = useState(0);
  const [pokemonDetail, setPokemonDetail] = useState(undefined);
  const [showFavourite, setShowFavourite] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(undefined);

  const favouriteList = useSelector(state => state.favourite);

  useEffect(() => {
    const getData = async () => {
      const res = await PokemonService.GetPokemonList(pageSize * currPage);
      if (res) {
        const currPokemonList = res.results.map((result, index) => {
          return {
            id: (pageSize * currPage) + index,
            isFavourite: favouriteList.findIndex(x => x.name === result.name) > -1,
            ...result
          };
        });
        setAllCount(res.count);
        setRowCount(res.count);
        setRows(currPokemonList);
      }
      setLoading(false);
    }

    if (!showFavourite && searchValue.length === 0) {
      getData();
    }
    else {
      if (searchValue.length === 0) {
        setRows(favouriteList);
        setRowCount(favouriteList.length);
      }
      else {
        const currRows = rows.filter(x => favouriteList.findIndex(r => r.name === x.name) > -1);

        setRows(currRows);
        setRowCount(currRows.length);
      }
      setLoading(false);
    }

    return () => {
      //setRows([]);
      //setRowCount(0);
      setLoading(true);
      //setCurrentPage(0);
      setPokemonDetail(undefined);
      //setShowFavourite(false);
      //setSearchValue('');
    }
  }, [currPage, showFavourite, searchValue]);

  const columns = [
    { field: 'isFavourite', headerName: 'Favourite', headerClassName: "col-overflow", renderCell: (params) => { return <MainCheckBox details={params} handleFavouriteChange={(data) => handleFavouriteChange(data, params)} /> }, flex: 1 },
    { field: 'name', headerName: 'Name', headerClassName: "col-overflow", renderCell: (params) => { return <MainButton details={params} onClick={(details) => onClick(details)} /> }, flex: 1 },
  ];

  function handleFavouriteChange(data, details) {
    dispatch(handleFavourite(data));
    if (showFavourite) {
      setRows((rows) => rows.filter((row) => row.id !== details.id));
    }
  }

  const onClick = (e) => {
    const getPokemonDetails = async () => {
      const res = await PokemonService.GetPokemonDetail(e.row.id + 1);
      if (res) {
        setPokemonDetail({
          name: res.name,
          height: res.height,
          weight: res.weight,
          image: res.sprites.front_default,
          abilities: Array.from(res.abilities, x => x.ability.name)
        });
      }
      else {
        setError({ title: "Error", content: "NotFound" })
      }
    }
    getPokemonDetails();
  }

  const handleChange = async (searchText) => {
    setSearchValue(searchText ?? "");

    if (searchText && searchText.length > 0 && showFavourite) {
      setRows(requestSearch(searchText, rows));
    } else if (searchText && searchText.length > 0) {
      const res = await PokemonService.GetPokemonList(0, allCount);
      if (res) {
        const searchedRows = requestSearch(searchText, res.results.map((result, index) => {
          return {
            id: index,
            isFavourite: favouriteList.findIndex(x => x.name === result.name) > -1,
            ...result
          };
        }));
        setRowCount(searchedRows.length);
        setRows(searchedRows);
      }
      else {
        setRows([])
      }
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error &&
        <MainSnackBar
          error={error}
          setError={(error) => setError(error)}
        />
      }
      <Title />
      <DataGrid
        components={{
          Toolbar: MainToolBar
        }}
        componentsProps={{
          toolbar: {
            loading: loading,
            showFavourite: showFavourite,
            setShowFavourite: setShowFavourite,
            rows: rows,
            setRows: setRows,
            handleChange: (value) => handleChange(value)
          }
        }}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowCount={rowCount}
        loading={loading}
        onPageChange={(e) => setCurrentPage(e)}
        density="compact"
        paginationMode="server"
        disableSelectionOnClick={true}
      />
      <MainModal
        pokemonDetail={pokemonDetail}
        setPokemonDetail={setPokemonDetail}
      />
    </div>
  );
}