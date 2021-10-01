import React from "react";
//import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
/*
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";
*/
import PatientListPage from "./PatientListPage";
import { SinglePatientVieweri } from "./AddPatientModal/SinglePatientView";

const App = () => {
  console.log('KÄYKÖ App KOPONENTISSA');

  //const [, dispatch] = useStateValue();
  console.log('KÄYKÖ App KOPONENTISSA');
  /*
  React.useEffect(() => {
    //void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        //console.log('PATIENT LIST FRONTISSA', patientListFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);
*/
  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>Home</Button>
          <Divider hidden />
          <Switch>
            <Route path="/api/patients/:id">
              <SinglePatientVieweri />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
