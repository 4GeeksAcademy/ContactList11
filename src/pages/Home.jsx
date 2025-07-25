import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Contacts from "./Contacts.jsx"

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<Contacts/>
		</div>
	);
}; 