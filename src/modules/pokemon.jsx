import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useCallback, useState } from "react";
import { PokemonService } from "../services/axios-service";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonDetails,
  getPokemonList,
  handleFavourite,
  setRowCount,
  setRows,
  setSearchValue,
  setShowFavourite,
} from "../services/reducers/root-reducer";
import MainToolBar from "./toolbar/toolbar";
import Title from "./title/title";
import MainModal from "./modal/modal";
import MainCheckBox from "./checkbox/checkbox";
import MainButton from "./button/button";
import "../helper/stringHelper";

const DataGridSelector = (showFavourite) => {
  const pokemonSelector = useSelector((state) => state.pokemon);
  const favouriteSelector = useSelector((state) => state.favourite);

  const dispatch = useDispatch();
  const setRowCountDispatch = (len) => dispatch(setRowCount(len));
  const setRowsDispatch = (rows) => dispatch(setRows(rows));
  const resetRows = () => dispatch(setRows([]));
  const setSearchValueDispatch = (value) => dispatch(setSearchValue(value));

  const handleChange = async (searchText) => {
    setSearchValueDispatch(searchText ?? "");
    if (searchText && searchText.length > 0 && showFavourite) {
      setRowsDispatch(searchText.requestSearch(pokemonSelector.rows));
    } else if (searchText && searchText.length > 0) {
      const res = await PokemonService.GetPokemonList(
        0,
        pokemonSelector.allCount
      );
      if (res) {
        const searchedRows = searchText.requestSearch(
          res.results.map((result, index) => {
            return {
              id: index,
              isFavourite:
                favouriteSelector?.favouriteList?.findIndex(
                  (x) => x.name === result.name
                ) > -1,
              ...result,
            };
          })
        );
        setRowCountDispatch(searchedRows.length);
        setRowsDispatch(searchedRows);
      } else {
        resetRows();
      }
    }
  };

  return { handleChange };
};

const PokemonList = ({
  showFavourite,
  setShowFavourite,
  setRowsDispatch,
  columns,
  pageSize,
  onPageChange,
}) => {
  const loading = useSelector((state) => state.pokemon.loading);
  const count = useSelector((state) => state.pokemon.count);
  const rows = useSelector((state) => state.pokemon.rows);
  const { handleChange } = DataGridSelector(showFavourite);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSize,
  });

  return (
    <DataGrid
      slots={{
        toolbar: MainToolBar,
      }}
      componentsProps={{
        toolbar: {
          loading: loading,
          showFavourite: showFavourite,
          setShowFavourite: setShowFavourite,
          rows: rows,
          setRows: setRowsDispatch,
          handleChange: handleChange,
        },
      }}
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      rowCount={count}
      loading={loading}
      paginationModel={paginationModel}
      onPaginationModelChange={(e) => {
        onPageChange(e);
        setPaginationModel(e);
      }}
      density="compact"
      paginationMode="server"
      disableSelectionOnClick={true}
      rowsPerPageOptions={[20, 50]}
    />
  );
};

export default function Pokemon() {
  const dispatch = useDispatch();
  const setRowsDispatch = (rows) => {
    dispatch(setRows(rows));
  };
  const handleFavouriteDispatch = (favourite) =>
    dispatch(handleFavourite(favourite));
  const getPokemonListDispatch = (list) => dispatch(getPokemonList(list));
  const getPokemonDetailsDispatch = (id) => dispatch(getPokemonDetails(id));
  const setShowFavouriteDispatch = (show) => dispatch(setShowFavourite(show));

  const favouriteList = useSelector((state) => state.favourite.favouriteList);
  const showFavourite = useSelector((state) => state.favourite.showFavourite);
  const searchValue = useSelector((state) => state.search.searchValue);
  const rows = useSelector((state) => state.pokemon.rows);

  const pageSize = 20;

  useEffect(() => {
    const setRowCountDispatch = (len) => dispatch(setRowCount(len));

    if (!showFavourite && searchValue.length === 0) {
      getPokemonListDispatch({
        seed: pageSize * 0,
        favouriteList: favouriteList,
      });
    } else {
      if (searchValue.length === 0) {
        setRowsDispatch(favouriteList);
        setRowCountDispatch(favouriteList.length);
      } else {
        const currRows = rows.filter(
          (x) => favouriteList.findIndex((r) => r.name === x.name) > -1
        );
        setRowsDispatch(currRows);
        setRowCountDispatch(favouriteList.length);
      }
    }

    return () => {
      //setRows([]);
      //setRowCount(0);
      //setLoading(true);
      //setCurrentPage(0);
      // setPokemonDetail(undefined);
      //setShowFavourite(false);
      //setSearchValue('');
    };
  }, [dispatch, searchValue.length, showFavourite]);

  const columns = [
    {
      field: "isFavourite",
      headerName: "Favourite",
      headerClassName: "col-overflow",
      /**
       *
       * @param {row: {isFavourite: boolean, name: string}} params
       * @returns
       */
      renderCell: (params) => {
        return (
          <MainCheckBox
            details={params}
            handleFavouriteChange={(data) =>
              handleFavouriteChange(data, params)
            }
          />
        );
      },
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "col-overflow",
      renderCell: (params) => {
        return (
          <MainButton
            details={params}
            onClick={(details) => onClick(details)}
          />
        );
      },
      flex: 1,
    },
  ];

  function handleFavouriteChange(data, details) {
    handleFavouriteDispatch(data);
    if (showFavourite) {
      setRowsDispatch((rows) => rows.filter((row) => row.id !== details.id));
    }
  }

  const onClick = (e) => {
    getPokemonDetailsDispatch(e.row.id + 1);
  };

  /**
   *
   * @param {{page: number, pageSize: number}} e
   */
  const onPageChange = (e) => {
    if (!showFavourite && searchValue.length === 0) {
      getPokemonListDispatch({
        seed: pageSize * e.page,
        favouriteList: favouriteList,
      });
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Title />
      <PokemonList
        showFavourite={showFavourite}
        setShowFavourite={setShowFavouriteDispatch}
        setRowsDispatch={setRowsDispatch}
        columns={columns}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      <MainModal />
    </div>
  );
}
