import { Box } from "@mui/system";
import LineWeightIcon from '@mui/icons-material/LineWeight';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Modal, ListItemIcon, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPokemon } from '../../services/reducers/root-reducer';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function MainModal() {
    const dispatch = useDispatch();
    const pokemonDetail = useSelector(state => state.pokemon?.pokemonDetails);
    const clearPokemonDetailsDispatch = (id) => dispatch(clearPokemon());
    return (
        <Modal
            open={!!pokemonDetail}
            onClose={() => { clearPokemonDetailsDispatch() }}
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
                <div id="modal-modal-description" sx={{ mt: 2 }} className="pokemon-details">
                    <LineWeightIcon /><p>{pokemonDetail?.weight}</p>
                </div>
                <div id="modal-modal-description" sx={{ mt: 2 }} className="pokemon-details">
                    <HeightIcon /> <p>{pokemonDetail?.height}</p>
                </div>
                <div id="modal-modal-description" sx={{ mt: 2 }} className="pokemon-details">
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
                </div>
            </Box>
        </Modal>)
}

export default MainModal;