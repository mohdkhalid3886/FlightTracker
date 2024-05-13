import React, { useRef, useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Flightinput.css';

function FlightInput() {
    const ref = [useRef(null), useRef(null), useRef(null)];
    const [airlines, setAirlines] = useState([   // to store all airlines name
        '(EK)Emirates',
        '(6E)Indigo',
        '(QR)Qatar Airways',
        '(BA)British Airways',
        '(DL)Delta Air Lines',
        '(LH)Lufthansa',
        '(SQ)Singapore Airlines',
        '(AF)Air France',
        '(AA)American Airlines',
        '(UA)United Airlines',
    ]);
    const [filteredAirlines, setFilteredAirlines] = useState([]);   //to store filtered airlines name 
    const [inputValue, setInputValue] = useState(''); // airline name
    const [departureDate, setDepartureDate] = useState(null); // departure date
    const [showAirlinesDropdown, setShowAirlinesDropdown] = useState(false); // conditional rendering for dropdown


    const handleChange = (date) => { // updating departure date
        setDepartureDate(date);
    };

    const handleAirlinesInputFocus = () => {  // conditional rendering
        setShowAirlinesDropdown(true)
    };
    
    const handleAirlinesInputChange = (event) => { //elastic search
        const value = ref[0].current.value;
        setInputValue(value);
        setFilteredAirlines(airlines.filter(airline => airline.toLowerCase().includes(value.toLowerCase())))
    };

    const handleAirlinesItemClick = (airline) => { // updating airline
        setInputValue(airline);
    };

    const handleClick = () => { // sendin message to whatsapp
        const airline = inputValue;
        const flightNumber = ref[1].current.value;

        console.log(airline,flightNumber)

        if (!airline.trim() || !flightNumber.trim() || !departureDate) {
            alert('Please fill in all the mandatory fields.');
            return;
        }

        const phoneNumber = '919760674679';
        const message = `Hi Havahavai, I want to subscribe alerts for my flight ${flightNumber} departing on ${departureDate.toDateString()}.`;
        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, '_blank');
    };


    useEffect(() => {  // unmounting the dropdown
        const handleClickOutside = (event) => {
            if (showAirlinesDropdown && !ref[0].current.contains(event.target)) {
                setShowAirlinesDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showAirlinesDropdown]);

    return (
        <>
          <div className="Subscribe-whatsapp">
          <div className="dropdown-container">
                <input 
                    type="text" 
                    placeholder="Airlines" 
                    onFocus={handleAirlinesInputFocus}
                    onChange={handleAirlinesInputChange}
                    value={inputValue}
                    ref={ref[0]}
                />
                {showAirlinesDropdown && (
                    <div className="airlines-dropdown">
                        <ul>
                            {filteredAirlines.map((airline, index) => (
                                <li key={index} onClick={() => handleAirlinesItemClick(airline)}>{airline}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <input type="text" ref={ref[1]} placeholder="Flight Number"/>
            <DatePicker selected={departureDate} onChange={handleChange} minDate={new Date()} placeholderText="Departure" />
            <button onClick={handleClick}>Subscribe to WhatsApp</button>
          </div>
        </>
    );
}

export default FlightInput;
