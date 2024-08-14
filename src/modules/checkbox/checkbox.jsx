import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

/**
 *
 * @param {{details: {row: {isFavourite: boolean, id: number, url: string, name: string}}}} props
 * @returns
 */
function MainCheckBox(props) {
  const favouriteList = useSelector((state) => state.favourite.favouriteList);
  const details = props.details;
  const isFavourite = favouriteList.find(x => x.id === details.row.id)?.isFavourite ?? false;
  return (
    <Checkbox
      className="text-lg"
      onChange={(e) =>
        props.handleFavouriteChange({
          ...details.row,
          isFavourite: !details.row.isFavourite,
        })
      }
      checked={isFavourite}
      value={isFavourite}
      checkedIcon={<>⭐</>}
      icon={<>➖</>}
    />
  );
}

MainCheckBox.propTypes = {
  handleFavouriteChange: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
};

export default MainCheckBox;
