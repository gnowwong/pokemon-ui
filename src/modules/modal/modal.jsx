import { Box } from "@mui/system";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterTwoToneIcon from "@mui/icons-material/FitnessCenterTwoTone";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPokemon } from "../../services/reducers/root-reducer";
import { ListItemIcon } from "@mui/material";
import AcUnit from "@mui/icons-material/AcUnit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MainModal() {
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemon?.pokemonDetails);
  const clearPokemonDetailsDispatch = (id) => dispatch(clearPokemon());
  return (
    <Modal
      open={!!pokemonDetail}
      onClose={() => {
        clearPokemonDetailsDispatch();
      }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {pokemonDetail?.name}
        </Typography>
        <div className="flex justify-center">
          <img
            src={pokemonDetail?.image}
            alt={pokemonDetail?.name}
            loading="lazy"
            className="w-2/4 h-2/4"
          />
        </div>
        <div
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className="grid grid-cols-2"
        >
          <LineWeightIcon />
          <p>{pokemonDetail?.weight}</p>
        </div>
        <div
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className="grid grid-cols-2"
        >
          <HeightIcon />
          <p>{pokemonDetail?.height}</p>
        </div>
        <div
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className="grid grid-cols-2"
        >
          <FitnessCenterTwoToneIcon />
          <List dense={true} className="p-0">
            {pokemonDetail?.abilities.map((value) =>
              React.cloneElement(
                <ListItem className="pl-0">
                  <ListItemIcon>
                    <AcUnit fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={value} />
                </ListItem>,
                {
                  key: value,
                }
              )
            )}
          </List>
        </div>
      </Box>
    </Modal>
  );
}

export default MainModal;
