import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import formComponent from './components/form';
import { useForm } from "react-cool-form";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Axios from 'axios';
const Field = ({ label, id, error, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...rest} />
    {error && <p>{error}</p>}
  </div>
);

function App() {
  
  const [keyword,setKeyword]=useState('');
  const [data,setData]=useState(null);
  const [show, setShow] = useState(true);
  
  const { form, use } = useForm({
    // (Strongly advise) Provide the default values
    defaultValues: { keyword: "" },
    // The event only triggered when the form is valid
    onSubmit: (values) => {
      if(keyword)
      {
    const mode= "no-cors"
   //const headers = { 'Content-Type': 'application/json' }
   //http://127.0.0.1:33507/
   //https://twitterclientapii.herokuapp.com/
       fetch('https://twitterclientapii.herokuapp.com/'+values.keyword,{headers:{"Access-Control-Allow-Origin": "https://twitterclientapii.herokuapp.com"}})
           .then(response => response.json())
           .then(data =>  setData(data) )
           .catch(err=>{alert("Something went wrong")})
        
      }
    },
  });
  // We can enable the "errorWithTouched" option to filter the error of an un-blurred field
  // Which helps the user focus on typing without being annoyed by the error message
  const errors = use("errors", { errorWithTouched: true }); // Default is "false"

  return (
    <div className="container" >
    <form ref={form} noValidate>
      <h1>Sentiment Analyser</h1>
      <Field
        label="Keyword"
        id="keyword"
        name="keyword"
        // Support built-in validation
        required
        error={errors.username}
      />
            <input onClick={(val)=>{setKeyword(val)}} type="submit" />
    </form>
     {data
     ?
     <>
      <Alert className="alert" show={show} variant="success">
        <p><h2>Tweet Report</h2></p>
        <p>
          Positive Tweets :{parseInt(data.ptweets).toFixed(2)}%
        </p>
        <p>
        Negative Tweets :{parseInt(data.ntweets).toFixed(2)}%
        </p>
        <p>
        Neutral Tweets :{parseInt(data.neutraltweet).toFixed(2)}%
        </p>

        <hr />
        <div className="d-flex justify-content-end">
          
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Maximise</Button>}
    </>
     :
     <div></div>
    
    }
    </div>
  );
}

export default App;
