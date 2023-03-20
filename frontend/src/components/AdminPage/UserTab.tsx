import { dialogClasses } from '@mui/material';
import PlusButton from './PlusButton';
import SearchBar from './SearchBar';

const addNewUser = () => {
  //console.log("hallaballa");
};

export default function UserTab() {
  return (
    <div>
      <PlusButton handleClick={addNewUser} />
      <SearchBar />
    </div>
  );
}
