import Contact from "../Contact/Contact";
import './Contacts.css'
import {contacts as DATA} from '../../constants';
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVenus, faMars, faMarsAndVenus} from '@fortawesome/free-solid-svg-icons';


function Contacts() {
    const [contacts, setContacts] = useState(DATA);
    const [search, setSearch] = useState('');
    const [genderSearchParams, setFenderSearchParams] = useState({male: true, female: true, unknownGender: true});

    useEffect(() => {
        setContacts(filterContacts());
    }, [search, genderSearchParams])

    const filterContacts = () => {
        const filteredByGender = DATA.filter(contact => genderSearchParams[contact.gender]
            || (!(contact.gender in genderSearchParams) && genderSearchParams.unknownGender));
        const searchResult = filteredByGender.filter(contact => `${contact.firstName} ${contact.lastName} ${contact.phone}`.toLowerCase().includes(search));
        return searchResult;
    }

    const handleSearchChange = (event) => setSearch(event.target.value.toLowerCase());
    const handleSearchByGender = (event) => {
        const target = event.target;
        setFenderSearchParams({
            ...genderSearchParams,
            [event.target.name]: target.checked
        });
    }

    return (
        <div className='d-flex contracts br-10'>
            <div className="d-flex contact-search br-10 ">
                <input className="contact-search-main br-10" type="text" placeholder="<Search..."
                       onChange={handleSearchChange}
                       value={search}/>
                <div className="d-flex contact-gender-search">
                    <div className="d-flex gender-checkbox">
                        <input name="male" type="checkbox"
                               onChange={handleSearchByGender}
                               checked={genderSearchParams.male}/>
                        <FontAwesomeIcon icon={faMars}/>
                    </div>
                    <div className="d-flex gender-checkbox">
                        <input name="female" type="checkbox"
                               onChange={handleSearchByGender}
                               checked={genderSearchParams.female}/>
                        <FontAwesomeIcon icon={faVenus}/>
                    </div>
                    <div className="d-flex gender-checkbox">
                        <input name="unknownGender" type="checkbox"
                               onChange={handleSearchByGender}
                               checked={genderSearchParams.unknownGender}/>
                        <FontAwesomeIcon icon={faMarsAndVenus}/>
                    </div>
                </div>
            </div>
            <div className="contacts-list">
                <ul>
                    {
                        contacts?.map(contact => <li className="br-10" key={uuidv4()}><Contact {...contact}/></li>)
                    }
                </ul>
            </div>

        </div>
    )
}

export default Contacts;