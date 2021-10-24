import React, {useState, useEffect} from 'react';

//component
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


//classes
import classes from "./Roadmap.css";

const roadmap_temp = {
  title: "Placement",
  description: "This is the discription about the placement!",
  start: "21 March, 2002",
  // user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     require: true,
  //     ref: 'User',
  // },
  // parent: { type: mongoose.Schema.Types.ObjectId, default: null }, // if cloned from other roadmap
  path: [
      {
          index: 0, //  sort order
          topic: "Data Structure",
          subpath: [
              {
                  index: 0, // sort order
                  topic: "Array",
                  description: "This is array!",
                  materials: ["String"],
              },
              {
                  index: 1, // sort order
                  topic: "Stack",
                  description: "This is Stack!",
                  materials: ["String"],
              },
              {
                  index: 2, // sort order
                  topic: "Queue",
                  description: "This is Queue!",
                  materials: ["String"],
              },
          ],
      },
      {
          index: 1, //  sort order
          topic: "Resume",
          subpath: [
              {
                  index: 0, // sort order
                  topic: "Language",
                  description: "This is array!",
                  materials: ["String"],
              },
              {
                  index: 1, // sort order
                  topic: "Experience",
                  description: "This is Stack!",
                  materials: ["String"],
              },
              {
                  index: 2, // sort order
                  topic: "Projects",
                  description: "This is Queue!",
                  materials: ["String"],
              },
          ],
      },
      {
          index: 2, //  sort order
          topic: "Interview",
          subpath: [
              {
                  index: 0, // sort order
                  topic: "Why you are good for this job?",
                  description: "This is array!",
                  materials: ["String"],
              },
              {
                  index: 1, // sort order
                  topic: "Who the hell are you?",
                  description: "This is Stack!",
                  materials: ["String"],
              },
              {
                  index: 2, // sort order
                  topic: "Fuck off!",
                  description: "This is Queue!",
                  materials: ["String"],
              },
          ],
      },
  ],
  tags: ["Tag", "Tag", "Tag"],
  // private: { type: Boolean, default: false },
}

const notes_temp = [
  {
    title: 'title 1',
    content: "This is the content of this note!", // can be markdown and what not
    date: '21 March, 2021',
  },
  {
    title: 'title 2',
    content: "This is the content of this note!", // can be markdown and what not
    date: '21 March, 2021',
  },
  {
    title: 'title 3',
    content: "This is the content of this note!", // can be markdown and what not
    date: '21 March, 2021',
  },
]

const date = new Date()

const Roadmap =(props)=> {

  const [roadmap, setRoadmap] = useState(null)
  const [createPath, setCreatePath] = useState({topic: null, data: [], showModal: false, index: 0})
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    setRoadmap(roadmap_temp);
    setNotes(notes_temp)
  }, [])

  const addHandler = () => {
    setCreatePath(prev => ({
      ...prev,
      showModal: true
    }))
  }

  const closeModal = () => {
    setCreatePath(prev => ({
      ...prev,
      showModal: false
    }))
  }

  const createSubPath = (newData) => {
    setCreatePath(prev => ({
      ...prev,
      data: [...prev.data, newData],
      showModal: false,
      index: prev.index+1
    }))
  }

  const removeLast = () => {
    setCreatePath(prev => ({
      ...prev,
      data: [...prev.data].splice(0, prev.data.length-1)
    }))
  }

  const createPathHandler = () => {
    setRoadmap(prev => ({
      ...prev,
      path: [
        ...prev.path,
        {
          index: roadmap.length,
          topic: createPath.topic,
          subpath: createPath.data
        }
      ]
    }))
    setCreatePath({topic: null, data: [], showModal: false, index: 0})
  }

  return (
    roadmap &&
    <div className={classes.Roadmap}>
      {createPath.showModal &&
        <div className={classes.Modal}>
        <div className={classes.Backdrop} onClick={closeModal}/>
          <CreateModal index={createPath.index} creatModal={createSubPath}/>
        </div>
      }
      <div className={classes.Info}>
        
        <h3>{roadmap.title}</h3>
        <div className={classes.Sec}>
          <label>description</label>
          <p>{roadmap.description}</p>
        </div>
        <div className={classes.Sec}>
          <label>Start</label>
          <p>{roadmap.start}</p>
        </div>
        <div className={classes.Sec}>
          <label>Tags</label>
          <ul>
            {roadmap.tags.length ? roadmap.tags.map((tag, index) => {
              return <li key={index}>{tag}</li>
            })
          : <li>No tags</li>}
          </ul>
        </div>

        <div className={classes.Sec}>
          <label>Notes</label>
          <div className={classes.Notes}>
              <List component="nav" aria-label="secondary mailbox folder">
              {notes.map((note, ind) => {
                return <ListItemButton style={{ width: '100%', display: "flex", justifyContent: "space-between" }} selected={1} >
                    <p>{note.title}</p> <p>{note.date}</p>
                </ListItemButton>
                })}
                
              </List>
          </div>
            
        </div>
      </div>
      
      <div className={classes.Main}>
          
          <div className={classes.StartDiv}>
            Starting Placement Roadmap
          </div>
        {
          roadmap.path.map((path, index) => {
            return <>
              <div className={classes.path}/>
              <div className={classes.Topics}>

                <p className={classes.title}>{path.topic}</p>
                
                <div className={classes.Box}>

                    <Stepper activeStep={1} alternativeLabel>
                      {path.subpath.map((sub, ind) => {
                        return <Step key={ind}>
                          <StepLabel >{sub.topic}</StepLabel>
                        </Step>
                      })}
                    </Stepper>
                  
                </div>
              
              </div>
            </>
          })
        }

        {/* adding more paths */}
        <div className={classes.path}/>
        <div className={classes.Topics}>

          <p className={classes.title}>
            <TextField onChange={(e) => { setCreatePath(prev => ({ ...prev, topic: e.target.value })) }} required size='small' id="standard-basic" label="Topic" variant="standard" value={createPath.topic || ""}/>
          </p>
          
          <div className={classes.Box}>
              <Stepper activeStep={0} alternativeLabel>
                {createPath.data.map((sub, ind) => {
                  return <Step key={ind}>
                    <StepLabel >{sub.topic}</StepLabel>
                  </Step>
                })}
              </Stepper>
          </div>
              <IconButton onClick={addHandler} size="large" color="primary" aria-label="add">
                <AddBoxIcon />
              </IconButton>
          
          <Button onClick={createPathHandler} style={{margin: "0 5px 0 0"}} disabled={!createPath.topic && !(createPath.data.length==0)} variant="contained" size="small">Create</Button>
          <Button onClick={removeLast} disabled={!createPath.data.length} variant="contained" size="small">Pop</Button>
          
        </div>

        </div>

    </div>
  );
}

export default Roadmap;





////create modal component

const CreateModal = (props) => {

  const [data, setData] = useState({
    index: props.index,
    topic: null,
    description: null,
    material: [],
  })
  const [material, setMaterial] = useState(null);

  const createHandler = () => {
    props.creatModal(data);
  }

  const addMaterial = () => {
    if (material != null && material != "") {
      setData(prev => ({
        ...prev,
        material: [...prev.material, material]
      }))
      setMaterial(null)
    }
  }

  const onChangeHandler = (e) => {
    if (e.target.name == "material") {
      setMaterial(e.target.value)
      return;
    }
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className={classes.CreateModal}>
      <div className={classes.head}>
        <label>Create Subtopic</label>
        <p>Step {props.index+1}</p>
      </div>
      <TextField required onChange={onChangeHandler} value={data.topic || ""} style={{margin: "10px 0"}} size='small' id="standard-basic" label="Subtopic" name="topic" variant="outlined" />
      <TextField
         style={{margin: "10px 0"}}
        id="outlined-multiline-static"
        label="Description"
        name="description"
        multiline
        rows={4}
        onChange={onChangeHandler}
        value={data.description || ""}
      />
      <div className={classes.material}>
        <TextField onChange={onChangeHandler} value={material || ""} style={{ margin: "10px 0" }} size='small' id="standard-basic" label="Material" name="material" variant="outlined" />
        <IconButton onClick={addMaterial} style={{ margin: "10px 0" }} size="small" color="primary" aria-label="add">
          <AddBoxIcon />
        </IconButton>
        <div className={classes.box}>
          {data.material.length ? data.material.map((mate, index) => {
            return <li key={index}>{mate}</li>
          }) : null}
        </div>
        
      </div>
      <Button onClick={createHandler} disabled={!data.topic} variant="contained" size="small">Create</Button>
    
    </div>
  )
}