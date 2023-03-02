import Dropdown from '@/components/Dropdown';
import DropdownMultiSelect from '@/components/DropdownMultiSelect';
import SubmitButton from '@/components/SubmitButton';
import ellipse from '@/assets/Ellipse 1.png';
import { getAllRoles } from '@/API/RoleAPI';
import { all } from 'axios';

/*
TODO: 
pass correct handleclick function to SubmitButton
pass correct data to listOfOptions (retrieve from database)
*/

/**
 *
 * @returns component that is the page for first-time registering
 */
export default function FirstTimeRegisterForm() {
  /*const allRoles = getAllRoles();
  console.log(allRoles);*/
  const listOfRoles: string[] = [];

  const allRoles = async () => {
    const roles = await getAllRoles();
    if (roles != null || roles != undefined) {
      roles.data.forEach((element) => {
        //console.log(element.name);
        listOfRoles.push(element.name);
      });
    } else {
      console.error('Data is null or undefined');
    }
  };

  //console.log(listOfRoles);

  return (
    <div className="max-w-full">
      <div className="flex flex-1 flex-col items-center">
        <img
          className="sm:w-[70vw] mobile:w-[90vw] sm:h-[20vh] mobile:h-[15vh]"
          src={ellipse}
          alt=""
        />
        <h1 className="mt-[-100px]">Første registrering</h1>
      </div>
      <div className="flex flex-1 flex-col items-center tablet:mt-20 mobile:mt-40">
        <Dropdown placeholder="Avdeling" listOfOptions={[]} />
        <Dropdown placeholder="Seksjon" listOfOptions={[]} />
        <DropdownMultiSelect placeholder="Fagområde" listOfOptions={[]} />
        <DropdownMultiSelect placeholder="Team" listOfOptions={[]} />
        <DropdownMultiSelect placeholder="Rolle" listOfOptions={listOfRoles} />
        <Dropdown placeholder="Ansattforhold" listOfOptions={[]} />
        <SubmitButton buttonText="Registrer deg" handleClick={allRoles} />
      </div>
    </div>
  );
}
