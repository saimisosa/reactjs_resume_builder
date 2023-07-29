import React, { useState } from "react";
import Loading from "./Loading";
import { GPTFunction } from "../index";
import {useNavigate} from "react-router-dom";


const Home = ({setResult}) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");
    const [currentPosition, setCurrentPosition] = useState("");
    const [currentLength, setCurrentLength] = useState(1);
    const [currentTechnologies, setCurrentTechnologies] = useState("");
    const [loading, setLoading] = useState(false);
    const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);

    const formData = new FormData();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("website", website);
        formData.append("currentPosition", currentPosition);
        formData.append("currentLength", currentLength);
        formData.append("currentTechnologies", currentTechnologies);
        formData.append("workHistory", JSON.stringify(companyInfo));

        const otherRoles = () => {
            let sampleText = "";
            for (let i = 0; i < companyInfo.length; i++) {
                sampleText += ` ${companyInfo[i].name} as a ${companyInfo[i].position}.`;
            }
            return sampleText;
        };

        const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;

        const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;

        const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${
            companyInfo.length
        } companies. ${otherRoles()} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;

        setLoading(true)

        const objective = await GPTFunction(prompt1);
        const keypoints = await GPTFunction(prompt2);
        const jobResponsibilities = await GPTFunction(prompt3);

        const chatgptData = { objective, keypoints, jobResponsibilities };

        const newPerson = {
            fullName,
            email,
            phoneNumber,
            website,
            currentPosition,
            currentLength,
            currentTechnologies,
            companyInfo,
            chatgptData
        }
        setLoading(false)
        setResult(newPerson);
        navigate("/resume")

    };

    //👇🏻 updates the state with user's input
    const handleAddCompany = () =>
        setCompanyInfo([...companyInfo, { name: "", position: "" }]);

//👇🏻 removes a selected item from the list
    const handleRemoveCompany = (index) => {
        const list = [...companyInfo];
        list.splice(index, 1);
        setCompanyInfo(list);
    };
//👇🏻 updates an item within the list
    const handleUpdateCompany = (e, index) => {
        const { name, value } = e.target;
        const list = [...companyInfo];
        list[index][name] = value;
        setCompanyInfo(list);
    };
    //👇🏻 Renders the Loading component you submit the form
    if (loading) {
        return <Loading />;
    }

    return (
        <div className='app'>
            <h1>Resume Builder</h1>
            <p>Feel the power of OpenAI!</p>
            <form
                onSubmit={handleFormSubmit}
                // method='POST'
                // encType='multipart/form-data'
            >
                <label htmlFor='fullName'>Enter your full name</label>
                <input
                    type='text'
                    required
                    name='fullName'
                    id='fullName'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <div className='otherContainer'>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            required
                            name='email'
                            className='currentInput'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input
                            type='text'
                            required
                            name='phoneNumber'
                            className='currentInput'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='website'>Website</label>
                        <input
                            type='text'
                            name='website'
                            className='currentInput'
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>

                </div>

                <div className='nestedContainer'>
                    <div>
                        <label htmlFor='currentPosition'>Current Position</label>
                        <input
                            type='text'
                            required
                            name='currentPosition'
                            className='currentInput'
                            value={currentPosition}
                            onChange={(e) => setCurrentPosition(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='currentLength'>For how long? (year)</label>
                        <input
                            type='number'
                            required
                            name='currentLength'
                            className='currentInput'
                            value={currentLength}
                            onChange={(e) => setCurrentLength(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='currentTechnologies'>Technologies used</label>
                        <input
                            type='text'
                            required
                            name='currentTechnologies'
                            className='currentInput'
                            value={currentTechnologies}
                            onChange={(e) => setCurrentTechnologies(e.target.value)}
                        />
                    </div>
                </div>
                <h3>Companies you've worked at:</h3>
                    {companyInfo.map((company, index) => (
                        <div className='nestedContainer' key={index}>
                            <div className='companies'>
                                <label htmlFor='name'>Company Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    required
                                    onChange={(e) => handleUpdateCompany(e, index)}
                                />
                            </div>
                            <div className='companies'>
                                <label htmlFor='position'>Position Held</label>
                                <input
                                    type='text'
                                    name='position'
                                    required
                                    onChange={(e) => handleUpdateCompany(e, index)}
                                />
                            </div>

                            <div className='btn__group'>
                                {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                                    <button id='addBtn' onClick={handleAddCompany}>
                                        Add
                                    </button>
                                )}
                                {companyInfo.length > 1 && (
                                    <button id='deleteBtn' onClick={() => handleRemoveCompany(index)}>
                                        Del
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                <button>CREATE RESUME</button>
            </form>
        </div>
    );
};

export default Home;