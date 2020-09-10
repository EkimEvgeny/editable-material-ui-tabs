import React, { useState, useRef } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";

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
    id: String;

    /**
     * Text to show and edit.
     */
    text: String;

    /**
     * Is current tab selected.
     */
    isSelected: Boolean;
}

/**
 * Represents an infrastructure of hotel component properties.
 */
export interface IMuiEkimTabProps {
    /**
     * Data model.
     */
    model: IMuiEkimTabModel;

    /**
     * Provides function to remove tab.
     * @param model Model to remove.
     */
    removeTab: (model: IMuiEkimTabModel) => void;

    /**
     * Provides function to change text.
     * @param model Model.
     * @param newText New text.
     */
    changeText: (oldModel: IMuiEkimTabModel, newText: String) => void;
}

export const EkimTab: React.FC<IMuiEkimTabProps> = ({
    model,
    removeTab,
    changeText
}: IMuiEkimTabProps) =>  {
    const classes = useStyles();
    const [isEditing, setIsEditing] = useState(false);
    let inputElement = useRef(null);

    let handleBadgeClick = () => {
        setIsEditing(!isEditing);
        console.info(inputElement);
        if(inputElement === null && inputElement === undefined)
            return;

        // @ts-ignore
        inputElement.current.focus();
    };
    let handleFocusLost = () => {
        setIsEditing(!isEditing);
    };
    const handleDelete = () => {
        console.info("You clicked the delete icon.");
    };

    return (
        <Paper variant="outlined" style={{ padding: "0px", borderRadius:'20px' }}>
            <Grid container spacing={2} className={classes.labelGrid}>
                <Grid item className={classes.gridItem}>
                    <Input
                        inputRef={inputElement}
                        id="standard-basic"
                        className={isEditing ? classes.input : classes.visuallyHidden}
                        onBlur={handleFocusLost}
                    />
                    <Typography
                        onClick={handleBadgeClick}
                        variant="button"
                        style={{ display: isEditing ? "none" : "flex" }}
                        className={classes.label}
                        gutterBottom
                    >
                        qwer
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton color="primary">
                        <ClearIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
}