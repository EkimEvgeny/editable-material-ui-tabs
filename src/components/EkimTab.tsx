import React, { useState, useRef } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        'visuallyHidden': {
            position: "absolute",
            clip: "rect(0 0 0 0)",
            height: "1px",
            margin: "-1px"
        },
        'labelGrid': {
            display: "flex",
            alignItems: "center",
            margin: '-14px -8px -14px 0px',
        },
        'label': {
            //paddingLeft:'10px',
            padding: '0 0 0 10px',
            margin: '0',
            width: '150px'
        },
        'input': {
            verticalAlign: "middle",
            width: '150px',
            padding: '0',
            margin: '0 0 0 10px',
        },
        'gridItem': {
            padding: '0px 0 0px  2px !important',
        },
        'overlay': {
            position: 'fixed',
            display: 'none',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 2,
            cursor: 'pointer',
        },
        'selectedTab': {
            backgroundColor: '#038cfc'
        },
        'commonTab': {
            backgroundColor: 'white'
        }
    })
);

/**
 * Data model to show.
 */
export interface IMuiEkimTabModel {
    /**
     * Identifier for current model.
     */
    id: string;

    /**
     * Text to show and edit.
     */
    text: string;
}

/**
 * Represents an infrastructure of tab component properties.
 */
export interface IMuiEkimTabProps {
    /**
     * Data model.
     */
    model: IMuiEkimTabModel;

    /**
     * Is this tab selected.
     */
    isSelected: boolean;

    /**
     * Is this tab text editable.
     */
    isEditable: boolean;

    /**
     * Is tab in loading mode now.
     */
    isLoading:boolean;

    /**
     * Provides function to remove tab.
     * @param model Model to remove.
     */
    removeTab: (model: IMuiEkimTabProps) => any;

    /**
     * Provides function to change text.
     * @param model Model.
     * @param newText New text.
     */
    changeTabCaption: (oldModel: IMuiEkimTabProps, newText: string) => void;

    /**
     * Handler for tab selection event.
     * @param model model for selected tab.
     */
    selectTab: (model: IMuiEkimTabProps) => void;
}

/**
 * Tab to show in panel.
 * @param model Model to show and edit.
 * @param removeTab Function to remove tab.
 * @param changeText Function to change text in model.
 */
export const EkimTab: React.FC<IMuiEkimTabProps> = ({...props
}: IMuiEkimTabProps) =>  {
    const classes = useStyles();

    // Needs to turn on edit mode of component.
    const [isEditing, setIsEditing] = useState(false);

    // Text to edit. Needs to keep text state during typing.
    const [text, setText] = useState(props.model.text);

    // Access to html element to set focus.
    let inputElement = useRef(null);

    // Handles click on badge when it's not in edit mode.
    let handleBadgeClick = () => {
        if(!props.isSelected){
            props.selectTab(props);
            return;
        }
        if(!props.isEditable){
            return;
        }

        setText(props.model.text);
        setIsEditing(!isEditing);
        console.info(inputElement);

        if(inputElement === null)
            return;

        // @ts-ignore
        inputElement.current.focus();
    };

    const endEditing = () => {
        props.changeTabCaption(props, text);
        setIsEditing(!isEditing);
    }

    // Handles lost focus event on input element.
    const handleFocusLost = () => {
        endEditing();
    };

    // Handles text changes in Input element in Edit mode.
    const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(props.isSelected) {
            setText(event.target.innerText);
        }
        else
            props.selectTab(props);
    }

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) =>{
        if(event.key === "Enter"){
            endEditing();
        }
    }

    const removeTabLocal = () => {
        props.removeTab(props);
    }
    console.log(props.model);
    return (
        <Paper variant="outlined"
               style={{ padding: "0px", borderRadius:'20px' }}
                className={props.isSelected ? classes.selectedTab: classes.commonTab}>
            <div className={props.isLoading ? classes.overlay: classes.visuallyHidden}>
                <CircularProgress />
            </div>
            <Grid container spacing={2} className={classes.labelGrid} >
                <Grid item className={classes.gridItem}>
                    <Input
                        inputRef={inputElement}
                        id="standard-basic"
                        className={isEditing ? classes.input : classes.visuallyHidden}
                        value={text}
                        onBlur={handleFocusLost}
                        onChange={onTextChange}
                    />
                    <Typography
                        onClick={handleBadgeClick}
                        variant="button"
                        style={{ display: isEditing ? "none" : "flex" }}
                        className={classes.label}
                        gutterBottom
                    >
                        {props.model.text}
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton color="primary" onClick={removeTabLocal}>
                        <ClearIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
}