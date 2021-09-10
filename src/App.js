import { useState,useEffect } from "react";
import NotesList from "./components/NotesList";
import uuidv4 from 'uuid/dist/v4';

import Search from './components/Search';
import Header from './components/Header';
function App() {

  const[notes,setNotes]=useState([
    {  
      id: uuidv4(),  
      text:'this is my first note',
      date:'15/04/2021',
    },
    {  
      id:  uuidv4(),  
      text:'this is my second note',
      date:'15/07/2021',
    },
    {  
      id:  uuidv4(),  
      text:'this is my third note',
      date:'10/09/2021',
    }
  ]
  );
  


  const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: uuidv4(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};


  return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
};

export default App;