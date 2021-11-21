import {Component} from "react";
import styles from "./styles/Home.module.css"
import {Ellipse} from "react-shapes/lib/Shapes";
import Button from '@mui/material/Button';

class Home extends Component {

    render () {
        return (
            <body className={styles.homePage}>

                 <Ellipse fill={{color:"#FFFFFF"}} rx={100} ry={100}/>
                 <Button variant="contained">Hello World</Button>

            </body>

        )
    }

}

export default Home