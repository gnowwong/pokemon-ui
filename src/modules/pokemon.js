import "./pokemon.scss";
import { Button, Checkbox, ListItemIcon, Toolbar, Typography } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { PokemonService } from '../services/axios-service';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import HeightIcon from '@mui/icons-material/Height';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useDispatch, useSelector } from "react-redux";
import { handleFavourite } from "../services/reducers/rootReducer";
import { requestSearch } from "../helper/stringHelper";
import SearchBar from "material-ui-search-bar";

export default function Pokemon() {
  const dispatch = useDispatch();
  const pageSize = 20;
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
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
    { field: 'isFavourite', headerName: 'Favourite', headerClassName: "col-overflow", renderCell: (params) => { return customCheckbox(params, params.value) }, flex: 1 },
    { field: 'name', headerName: 'Name', headerClassName: "col-overflow", renderCell: (params) => { return customButton(params) }, flex: 1 },
  ];

  const Title = () => {
    return (
      <>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 }
          }}
        >
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Pokemon List
          </Typography>
        </Toolbar>
      </>
    );
  };

  const customCheckbox = (details, value) => {

    function handleFavouriteChange(data) {
      dispatch(handleFavourite(data));
      if (showFavourite) {
        setRows((rows) => rows.filter((row) => row.id !== details.id));
      }
    }

    return <Checkbox onChange={(e) => handleFavouriteChange({ ...details.row, isFavourite: !details.row.isFavourite })} defaultChecked={details.row.isFavourite} value={details.row.isFavourite} checkedIcon={<>⭐</>} icon={<>➖</>} />
  }

  const customButton = (details) => {

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

    return <Button className="pokemon-name-modal" onClick={() => onClick(details)} variant="text" size="small">{details.row.name}</Button>
  }

  const handleChange = async (searchText) => {
    setSearchValue(searchText ?? "");

    if (searchText && searchText.length > 0 && showFavourite) {
      setRows(requestSearch(searchText, rows));
    } else if (searchText && searchText.length > 0) {
      const res = await PokemonService.GetPokemonList(0, rowCount);
      if (res) {
        setRowCount(res.count);
        setRows(requestSearch(searchText, res.results.map((result, index) => {
          return {
            id: index,
            isFavourite: favouriteList.findIndex(x => x.name === result.name) > -1,
            ...result
          };
        })));
      }
      else {
        setRows([])
      }
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Title />
      <div className="enchanced-toolbar">
        <div><Checkbox checked={showFavourite} onChange={() => { setShowFavourite(!showFavourite); }} />Show Favourite</div>
        <SearchBar
          className="pokemon-search-bar"
          placeholder={"Press enter to search"}
          value={searchValue}
          onRequestSearch={handleChange}
          onCancelSearch={handleChange}
          disabled={loading}
          onChange={handleChange}
        />
      </div>
      <DataGrid
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
      <Modal
        open={pokemonDetail !== undefined}
        onClose={() => { setPokemonDetail(undefined) }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {pokemonDetail?.name}
          </Typography>
          <div className="pokemon-img-container">
            <img
              src={pokemonDetail?.image}
              alt={pokemonDetail?.name}
              loading="lazy"
              className="pokemon-img"
            />
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="pokemon-details">
            <LineWeightIcon /><p>{pokemonDetail?.weight}</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="pokemon-details">
            <HeightIcon /> <p>{pokemonDetail?.height}</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="pokemon-details">
            <FitnessCenterTwoToneIcon />
            <List dense={true} className="pokemon-details-list">
              {
                pokemonDetail?.abilities.map((value) =>
                  React.cloneElement(<ListItem>
                    <ListItemIcon>
                      <AcUnitIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={value}
                    />
                  </ListItem>, {
                    key: value,
                  }),
                )
              }
            </List>
          </Typography>
        </Box>
      </Modal>
      {error &&
        <Snackbar open={error !== undefined} autoHideDuration={6000} onClose={() => { setError(undefined) }}>
          <Alert severity="error" sx={{ width: '100%' }}>
            <AlertTitle>{error?.title}</AlertTitle>
            {error?.content}
          </Alert>
        </Snackbar>
      }
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};