import styles from './App.module.css'
import {SlidesList} from "./view/slideList/SlideList.tsx";
import { TopPanel } from './view/topPanel/TopPanel.tsx';
import { Workspace } from './view/workSpace/Workspace.tsx';

function App() {
    return ( 
        <>
            <TopPanel></TopPanel> 
            <div className={styles.container}>
            <SlidesList ></SlidesList>
                <Workspace>
                </Workspace>
            </div>
        </>
    )
}

export default App